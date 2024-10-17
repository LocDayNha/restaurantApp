import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native'
import { React, useState, useEffect } from 'react'
import Item_List_History from '../../item/Item_List_History';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);

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
  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unSubscribe;
  }, [navigation]);

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={{ width: '100%', height: '67%' }}>
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
      <View style={{ height: '33%', paddingTop: 10, paddingHorizontal: 20, backgroundColor: 'rgba(221, 221, 221, 0.1)' }}>
        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
            <Text style={styles.textTotal}>Số Lượng:</Text>
            <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
              {totalQuantity}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
              <Text style={styles.textTotal}>Tổng:</Text>
              <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                {totalPrice} vnđ
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 15 }}>
            <TextInput style={styles.textIn} placeholder="Số bàn:" />
            <TextInput style={styles.textIn} placeholder="Tên Khách Hàng:" />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable style={styles.order} onPress={() => {/* Lệnh nhảy màn hình sang Payment/OrderDetail, maybe? */}}>
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
