import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import Item_List_History from '../../item/Item_List_History';

const initialData = [
  {
    id: '1',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fph%E1%BB%9F.jpg?alt=media&token=2c627a35-33f3-4c2c-9019-e48b231ca3a9",
    title: 'Phở',
    price: 100000,
    quantity: 1
  },
  {
    id: '2',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fmi%20quang.jpg?alt=media&token=3163efed-0527-47f7-8345-a79641eb505a",
    title: 'Mì Quảng',
    price: 100000,
    quantity: 1
  },
  {
    id: '3',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: 100000,
    quantity: 1
  },
  {
    id: '4',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: 100000,
    quantity: 1
  },
  {
    id: '5',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: 100000,
    quantity: 1
  },
  {
    id: '6',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: 100000,
    quantity: 1
  },
];

const History = () => {
  const [data, setData] = useState(initialData);

  // Function to calculate total quantity and price
  const calculateTotal = () => {
    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalQuantity, totalPrice };
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedData = data.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(updatedData);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedData = data.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setData(updatedData);
  };

  // Delete item
  const deleteItem = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <View style={{ height: '100%', width: '100%' }}>
      {/* List of items */}
      <View style={{ width: '100%', height: '65%' }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item_List_History
              data={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={deleteItem}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Bottom Section for Total and Customer Details */}
      <View style={{ height: '35%',paddingTop: 10, paddingHorizontal: 20, backgroundColor:'rgba(221, 221, 221, 0.1)'}}>
        {/* Quantity and Total Price Section */}
        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
            <Text style={styles.textTotal}>Số Lượng:</Text>
            <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
              {totalQuantity}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textTotal}>Tổng:</Text>
            <Text style={[styles.textTotal, { marginLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
              {totalPrice} vnđ
            </Text>
          </View>
        </View>

        {/* Input fields for Table Number and Customer Name */}
        <View style={{ flexDirection: 'column', marginBottom: 15 }}>
          <TextInput style={styles.textIn} placeholder="Số bàn:" />
          <TextInput style={styles.textIn} placeholder="Tên Khách Hàng:" />
        </View>

        {/* Order Button */}
        <View style={{ alignItems: 'center' }}>
          <Pressable style={styles.order}>
            <Text style={styles.textOrder}>Gọi Món</Text>
          </Pressable>
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
