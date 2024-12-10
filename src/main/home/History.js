import { View, Text, FlatList, StyleSheet, Pressable, TextInput, ToastAndroid } from 'react-native'
import { React, useState, useEffect, useContext } from 'react'
import Item_List_History from '../../item/Item_List_History';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../util/AxiosInstance';
import { AppContext } from '../../util/AppContext';

const History = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const { numberTable, setNumberTable, idOrder, setIdOrder } = useContext(AppContext)

  const calculateTotal = () => {
    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalQuantity, totalPrice };
  };

  const increaseQuantity = (id) => {
    const updatedData = data.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(updatedData);
    saveData(updatedData); // Lưu AsyncStorage
  };

  const decreaseQuantity = (id) => {
    const updatedData = data.map(item =>
      item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setData(updatedData);
    saveData(updatedData); // Lưu AsyncStorage
  };

  const deleteItem = (id) => {
    const updatedData = data.filter(item => item._id !== id);
    setData(updatedData);
    saveData(updatedData); // Lưu AsyncStorage
  };

  const deleteAllItem = () => {
    AsyncStorage.removeItem('orther');
    setData([]);
    saveData([]); // Lưu AsyncStorage
  };

  const saveData = async (dataToSave) => {
    try {
      const jsonValue = JSON.stringify(dataToSave);
      await AsyncStorage.setItem('orther', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('orther');
      const value = JSON.parse(jsonValue) || [];
      setData(value);
    } catch (e) {
      console.log(e);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'vnd'); // Thay ký hiệu "₫" bằng "vnđ" nếu cần
  };

  const orderDishes = async () => {
    try {
      if (numberTable && data.length > 0) {
        const dataFood = await AxiosInstance().post("/order/addNew", { numberTable: numberTable, dishes: data });
        if (dataFood) {
          console.log('Order Thanh Cong');
          deleteAllItem();
          setNumberTable(null);
        } else {
          console.log('Order That Bai');
        }
      } else if (idOrder && data.length > 0) {
        const dataFood = await AxiosInstance().post("/order/edit", { id: idOrder, dishes: data });
        if (dataFood) {
          console.log('Cap nhat order Thanh Cong');
          deleteAllItem();
          setIdOrder(null);
        } else {
          console.log('Cap nhat order That Bai');
        }
      } else {
        ToastAndroid.show('Thiếu dữ liệu!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Order Dishes Error:', error);
    }
  }

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unSubscribe;
  }, [navigation]);

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <View style={{ height: '100%', width: '100%', marginTop:'2%' }}>
      <View style={{ width: '100%', height: '83%' }}>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item_List_History
              data={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={deleteItem}
            />}
            keyExtractor={item => item._id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={{ height: '17%', paddingTop: 10, paddingHorizontal: 20 }}>
        <View style={{ marginBottom: 5 }}>
          <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
              <Text style={styles.textTotal}>Số Bàn:</Text>
              <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                {numberTable}
              </Text>

              <Text style={[styles.textTotal, { marginLeft: 20 }]}>Số Lượng:</Text>
              <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                {totalQuantity}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.textTotal}>Tổng:</Text>
              <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable style={styles.order} onPress={orderDishes}>
              <Text style={styles.textOrder}>Gọi Món</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTotal: {
    fontSize: 15,
    color: 'black',
  },
  order: {
    width: '50%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOrder: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  textIn: {
    height: 45,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    color: 'black',
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default History;
