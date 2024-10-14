import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Item_List_History = (props) => {
  const { data } = props
 
  return (
    <View elevation={3} style={styles.item} key={data._id}>
      <Image style={styles.avata} source={{ uri: data.image }} />
      <View style={styles.text_container}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.price}>{data.price}</Text>
        </View>
        <View style={{marginTop:'7%'}}> 
          <Text style={[styles.price, {color:'black', fontSize:20, marginBottom:'50%'}]}>x1</Text>
          <TouchableOpacity onPress={() => { }} style={{ marginRight: 5 }}>
            <Image style={styles.imageDelete} source={require('../icon/deleteCart.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  avata: {
    width: 80, height: 80,
    borderRadius: 50,
  },
  item: {
    width: 350, height: 100,
    shadowColor: 'black', shadowOffset: { width: 5, height: 3 }, shadowRadius: 2, shadowOpacity: 0.8,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    alignItems:'center'
  },
  text_container: {
    marginLeft: '5%',
    width: '70%', height: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'

  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold'
  },
  price: {
    fontSize: 15,
    color: '#888',
    marginTop: 3
  },
  imageDelete: {
    width: 24,
    height: 24,
    marginTop: 3,
  }
});
export default Item_List_History