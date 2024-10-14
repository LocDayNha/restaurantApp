import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native'
import React from 'react'
import Item_List_History from '../../item/Item_List_History';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return (
    <View style={{ height: '100%', width: '100%' }}>

      <View style={{ width: '100%', height: '77%' }}>
        <View style={styles.container}>
          <FlatList
            data={DATAhistory}
            extraData={DATAhistory}
            renderItem={({ item }) => <Item_List_History data={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={{ height: '23%', borderRadius: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <TextInput style={styles.textIn} placeholder="So ban:"></TextInput>
            <TextInput style={styles.textIn} placeholder="Ten Khach Hang:"></TextInput>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: '7%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.textTotal}>So Luong:</Text>
              <Text style={[styles.textTotal, { marginLeft: '3%', fontSize: 20, fontWeight: 'bold' }]}>3</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.textTotal}>Tong:</Text>
              <Text style={[styles.textTotal, { marginLeft: '3%', fontSize: 20, fontWeight: 'bold' }]}>30000 vnd</Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: '2%' }}>
          <Pressable style={styles.order}>
            <Text style={styles.textOrder}>Goi Mon</Text>
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
