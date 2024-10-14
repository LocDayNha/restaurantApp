import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Item_List_History from '../../item/Item_List_History';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATAhistory = [
  {
    id: '1',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fph%E1%BB%9F.jpg?alt=media&token=2c627a35-33f3-4c2c-9019-e48b231ca3a9",
    title: 'Phở',
    price: '100000 vnđ'
  },
  {
    id: '2',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fmi%20quang.jpg?alt=media&token=3163efed-0527-47f7-8345-a79641eb505a",
    title: 'Mì Quảng',
    price: '100000 vnđ'
  },
  {
    id: '3',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: '100000 vnđ'
  },
  {
    id: '4',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: '100000 vnđ'
  },
  {
    id: '5',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: '100000 vnđ'
  },
  {
    id: '6',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: '100000 vnđ'
  },
  {
    id: '7',
    image: "https://firebasestorage.googleapis.com/v0/b/phoenix-restaurant-401d8.appspot.com/o/VN%20Food%2Fb%C3%A1nh%20m%C3%AC.jpg?alt=media&token=baffd523-9c7e-451e-8edf-e037bcb33715",
    title: 'Bánh mì',
    price: '100000 vnđ'
  },
];
const History = (props) => {

  const {navigation} =props

  const [dataOrder, setDataOrder] = useState([])
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('orther');
      const value = JSON.parse(jsonValue)
      setDataOrder(value)
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', ()=>{
      getData()
    })
    return unSubscribe
  }, [navigation])

  return (
    <View style={{ height: '100%', width: '100%' }}>

      <View style={{ width: '100%', height: '77%' }}>
        <View style={styles.container}>
          <FlatList
            data={dataOrder}
            renderItem={({ item }) => <Item_List_History data={item} />}
            keyExtractor={item => item._id}
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
          <Pressable onPress={()=> {console.log(dataOrder)}}  style={styles.order}>
            <Text style={styles.textOrder}>Goi Mon</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    marginTop: 0,
  },
  textTotal: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: 'black'
  },
  order: {
    width: '50%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textOrder: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700'
  },
  textIn: {
    width: '100%',
    height: 37,
    backgroundColor: '#DDDDDD',
    marginTop: 10,
    marginLeft: '5%',
    borderRadius: 10,
    color: 'black',
    fontFamily: 'Poppins',
    paddingLeft: '3%'
  }
})

export default History