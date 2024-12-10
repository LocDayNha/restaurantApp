import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {React, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../util/AppContext';

const CheckTypePayment = props => {
  const data = [
    {
      _id: '1',
      price: 1000000,
      quantity: 5,
    },
  ];

  const navigation = useNavigation();
  // const { idUser, infoUser } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(1000000);
  const [idItemOrder, setIdItemOrder] = useState('671c4e027c1a9afd4dd89d31');

  const payCod = () => {};

  const payVN = async () => {
    navigation.navigate('VnPayWebView', {
      idItemOrder: idItemOrder,
      totalAmount: totalPrice,
    });
  };

  const payZalo = () => {};

  const payMoMo = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => payVN()}
            style={[styles.viewItem, {flexDirection: 'row'}]}>
            <Image
              style={styles.imagePayment}
              source={require('../../image/VNPay.jpg')}></Image>
            <Text style={styles.textPayment}>Thanh toán VN Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckTypePayment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    width: '85%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItem: {
    width: '90%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: '5%',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.8,
    backgroundColor: '#ffffff',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 45,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000',
  },
  textPayment: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000',
  },
  imagePayment: {
    width: 70,
    height: 70,
    marginRight: '5%',
    borderRadius: 10,
  },
});
