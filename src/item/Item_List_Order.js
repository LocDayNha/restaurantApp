import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native'
import React,{useState} from 'react'


const Item_List_Order = (props) => {
  const {data} = props

  return (
    <View elevation={5} style={styles.item}>
      <TouchableOpacity style={{marginLeft:'70%', marginTop:'5%'}}>
        <Image style={{width:24, height:24}} source={require('../icon/add.png')}></Image>
      </TouchableOpacity>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Image style={styles.avata} source={{uri: data.image}}/>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.price}>{data.price}</Text>
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
    avata: {
        width: 100, height: 100,
        borderRadius: 50,
        marginBottom:'5%'
      },
    item: {
      width: 150, height: 200,
      shadowColor: 'black', shadowOffset: {width:0, height: 3},shadowRadius: 1, shadowOpacity: 0.8,
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 30,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
    },
    title: {
      fontSize: 16,
      color:'#000000'
    },
    price: {
      fontSize: 15,
      color:'#888'
    },
});
export default Item_List_Order