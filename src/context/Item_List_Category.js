import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

import HomeMenu from './HomeMenu'


const Item_List_Category = ({data,onPress, bgcl, textColor}) => {

 
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item,{backgroundColor: bgcl}]}>
      <View elevation = {5}>
        <Image style={styles.avata} source={{uri: data.image}}/>
        <Text style={[styles.title,{color: textColor}]}>{data.title}</Text>
      </View>
    </TouchableOpacity>
    
  )
}
const styles = StyleSheet.create({
    avata: {
        width: 40, height: 40,
        borderRadius: 20,
        marginVertical: 8,
      },
    item: {
      width: 60, height: 90,
      backgroundColor: '#95AE45',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 30,
      shadowColor: 'black', shadowOffset: {width:0, height: 3},shadowRadius: 1, shadowOpacity: 0.8,
      flexDirection: 'column',
    },
    title: {
      fontSize: 12,
      color:'#ffffff'
    },
  });
export default Item_List_Category