import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import AxiosIntance from '../../util/AxiosInstance';
import {useNavigation} from '@react-navigation/native';

export default function VnPayWebView(props) {
  const [paymentUrl, setPaymentUrl] = useState('');
  const {idItemOrder, totalAmount} = props.route.params;
  const navigation = useNavigation();

  const INJECTED_JAVASCRIPT = `(function() {
    let selector = document.querySelector("pre");
    if (selector) {
      let url = selector.innerHTML;
      selector.remove();
      window.ReactNativeWebView.postMessage(url);
    }
  })();`;

  useEffect(() => {
    console.log('useEffect is called');
    const getVnPayPaymentUrl = async () => {
      try {
        console.log('Calling API to get payment URL');
        const result = await AxiosIntance().get(
          '/payment/vnpay/create_payment_url?amount=' +
            totalAmount +
            '&idItemOrder=' +
            idItemOrder,
        );
        console.log('API response:', result);

        if (result && result.url) {
          setPaymentUrl(result.url);
          console.log('Payment URL:', result.url);
        } else {
          console.log('No URL returned from API');
        }
      } catch (error) {
        console.log('Error fetching payment URL:', error);
      }
    };
    getVnPayPaymentUrl();
  }, []);

  return (
    <WebView
      source={{uri: paymentUrl}}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onLoadStart={event => {
        console.log('WebView started loading:', event.nativeEvent.url);
        if (event.nativeEvent.url.includes('/payment/vnpay/result')) {
          console.log('Navigation to result URL detected');
        }
      }}
      onMessage={event => {
        console.log('Message received from WebView:', event.nativeEvent.data);
        let responseUrl = event.nativeEvent.url;
        if (responseUrl.includes('/payment/vnpay/result')) {
          let responseData = JSON.parse(event.nativeEvent.data);
          if (responseData.responseCode !== '00') {
            console.log(
              'Transaction failed with responseCode:',
              responseData.responseCode,
            );
          } else {
            console.log('Transaction successful');
            navigation.navigate('Main');
          }
        }
      }}
    />
  );
}
