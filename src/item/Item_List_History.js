import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Item_List_History = ({ data, onIncrease, onDecrease, onDelete }) => {
  return (
    <View elevation={3} style={styles.item}>
      <Image style={styles.avata} source={{ uri: data.image }} />
      <View style={styles.text_container}>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.price}>{data.price} vnđ</Text>
        </View>

        <View style={styles.quantityContainer}>
          {/* Decrease Button */}
          <TouchableOpacity onPress={() => onDecrease(data.id)} style={styles.button}>
            <Text style={styles.buttonTextde}>-</Text>
          </TouchableOpacity>

          {/* Quantity Display */}
          <Text style={styles.quantityText}>{data.quantity}</Text>

          {/* Increase Button */}
          <TouchableOpacity onPress={() => onIncrease(data.id)} style={styles.button}>
            <Text style={styles.buttonTextin}>+</Text>
          </TouchableOpacity>
          
          {/* Delete Button */}
          <TouchableOpacity onPress={() => onDelete(data.id)} style={styles.deleteButton}>
            <Image style={styles.imageDelete} source={require('../icon/deleteCart.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avata: {
    width: 80, 
    height: 80,
    borderRadius: 50,
  },
  item: {
    width: 350, 
    height: 100,
    shadowColor: 'black', 
    shadowOffset: { width: 5, height: 3 }, 
    shadowRadius: 2, 
    shadowOpacity: 0.8,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    alignItems: 'center',
  },
  text_container: {
    marginLeft: '5%',
    width: '70%', 
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: '#888',
    marginTop: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    // padding: 10,
    // width: 10,
    // height: 10,
    borderRadius: 5,
    marginTop: -20,
    marginLeft: 20,
  },
  buttonTextde: {
    fontSize: 40,
    // backgroundColor: 'gray',
    color: '#000',
  },
  buttonTextin: {
    fontSize: 24,
    // backgroundColor: 'gray',
    color: '#000',
    marginTop: 5,
    // zIndex: 0,
  },
  quantityText: {
    color: 'black',
    padding: 5,
    marginLeft: 24,
    marginTop: -15,
    fontSize: 20,
  },
  deleteButton: {
    marginTop: 50,
    // marginLeft: 5,
    padding: 0,
    borderRadius: 5,
  },
  imageDelete: {
    width: 24,
    height: 24,
  },
});

export default Item_List_History;
