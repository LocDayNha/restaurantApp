import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../util/AppContext';

const Item_List_Order = props => {
  const {data} = props;
  const {infoUser} = useContext(AppContext);
  //add order
  const storeData = async value => {
    try {
      // lấy danh sách trong asyncstorage id: 'orther'
      const jsonValue = await AsyncStorage.getItem('orther');
      const json = JSON.parse(jsonValue);
      if (json) {
        // nếu trong danh sách có item thì add thêm vào
        const idvalue = value._id; // lấy id món ăn đang chọn
        const idjson = json.find(json => json._id == idvalue); // lấy id món ăn trong danh sách
        const list = json;
        if (idjson == undefined) {
          // kiểm tra id món ăn có bị trùng hay không
          list.push(value);
          try {
            await AsyncStorage.setItem('orther', JSON.stringify(list));
            ToastAndroid.show('Món ăn đã thêm', ToastAndroid.SHORT);
          } catch (error) {
            console.log(error);
          }
        } else {
          ToastAndroid.show('Món ăn đã có trong giỏ hàng', ToastAndroid.SHORT);
        }
      } else {
        // nếu chưa có item nào thì add item đầu tiên (chưa hiểu phần này thì liên hệ Phi)
        const list = [];
        list.push(value);
        try {
          await AsyncStorage.setItem('orther', JSON.stringify(list));
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      // saving error
    }
  };

  //định dạng giá tiền
  const formatPrice = price => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  return (
    <View elevation={5} style={styles.item} key={data._id}>
      <TouchableOpacity
        onPress={() => {
          storeData(data);
        }}
        style={{marginLeft: '70%', marginTop: '5%'}}
        disabled={infoUser.role === 1}>
        <Image
          style={{width: 24, height: 24}}
          source={require('../icon/add.png')}></Image>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.avata} source={{uri: data.image}} />
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.price}>{formatPrice(data.price)} vnđ</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  avata: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: '5%',
  },
  item: {
    width: 150,
    height: 200,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.8,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  price: {
    fontSize: 15,
    color: '#888',
  },
});
export default Item_List_Order;
