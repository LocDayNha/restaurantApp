import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Item_List_History = (props) => {
    const {data} = props
    return (
        
      <TouchableOpacity>
        <View elevation={5} style={styles.item}>
          <Image style={styles.avata} source={{uri: data.image}}/>
          <View style={styles.text_container}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>{data.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
       
    )
} 
const styles = StyleSheet.create({
    avata: {
        width: 100, height: 100,
        borderRadius: 50,
        marginVertical: 8,
      },
    item: {
      width: 350, height: 140,
      shadowColor: 'black', shadowOffset: {width:5, height: 3},shadowRadius: 2, shadowOpacity: 0.8,
      alignItems: 'center',
      marginVertical: 8,
      borderRadius: 30,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      paddingHorizontal: 20
    },
    text_container: {
      marginLeft: 20,
      width: 190, height: 70,
      
    },
    title: {
      fontSize: 20,
      color:'#000000',
      fontWeight: 'bold'
    },
    price: {
      fontSize: 15,
      color:'#888',
      marginVertical: 20
    },
});
export default Item_List_History