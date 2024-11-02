import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import OrderProcessing from '../payment/OrderProcessing';
import AxiosIntance from '../../util/AxiosInstance';
import OrderProcessingStatusEnum from '../../util/OrderProcessingStatusEnum';


export default function VnPayWebView(props) {
  const [paymentUrl, setPaymentUrl] = useState('');
  const { totalAmount } = props.route.params;
  const [orderProcessingStatus, setOrderProcessingStatus] = useState(
    OrderProcessingStatusEnum.PROCESSING
  );
  const navigation = useNavigation();
  const INJECTED_JAVASCRIPT = `(function() {
    let selector = document.querySelector("pre");
    let url = selector.innerHTML;
    selector.remove();
    window.ReactNativeWebView.postMessage(url);
  })();`;

  const [isOrderProcessingLoading, setIsOrderProcessingLoading] = useState(true);

  useEffect(() => {
    const getVnPayPaymentUrl = async () => {
      try {
        const result = await AxiosIntance().get(
          `payment/vnpay/create_payment_url?amount=${totalAmount}`
        );
        setPaymentUrl(result.url);
        setIsOrderProcessingLoading(false);
      } catch (error) {
        setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
        setTimeout(() => {
          navigation.navigate('CheckTypePayment');
        }, 3000);
      }
    };
    getVnPayPaymentUrl();
    return () => { };
  }, []);

  const handleSubmitOrder = async () => {
    try {
      setOrderProcessingStatus(OrderProcessingStatusEnum.SUCCESSED);
    } catch (error) {
      setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
    } finally {
      setTimeout(() => {
        navigation.navigate('CheckTypePayment');
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 24 }}>
      {paymentUrl && isOrderProcessingLoading == false && (
        <View style={{ flex: isOrderProcessingLoading ? 0 : 1 }}>
          <WebView
            source={{ uri: paymentUrl }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onLoadStart={(event) => {
              if (event.nativeEvent.url.includes('payment/vnpay/result')) {
                setIsOrderProcessingLoading(true);
              }
            }}
            onMessage={(event) => {
              let responseUrl = event.nativeEvent.url;
              if (responseUrl.includes('payment/vnpay/result')) {
                let responseData = JSON.parse(event.nativeEvent.data);
                if (responseData.responseCode !== '00') {
                  setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
                  setTimeout(() => {
                    setPaymentUrl('');
                    navigation.navigate('CheckTypePayment');
                  }, 3000);
                  return;
                }
                setOrderProcessingStatus(OrderProcessingStatusEnum.PROCESSING);
                handleSubmitOrder(responseData);
              }
            }}
          />
        </View>
      )}

      {isOrderProcessingLoading && <OrderProcessing status={orderProcessingStatus} />}
    </SafeAreaView>
  );
}
