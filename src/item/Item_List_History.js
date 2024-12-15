import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Item_List_History = ({ data, onIncrease, onDecrease, onDelete }) => {

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'vnd'); // Thay ký hiệu "₫" bằng "vnđ" nếu cần
  };

  return (
    <View elevation={3} style={styles.item} key={data._id}>
      <Image style={styles.avatar} source={{ uri: data.image }} />
      <View style={styles.textContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {data.name}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {formatCurrency(data.price)}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          {/* Decrease Button */}
          <TouchableOpacity onPress={() => onDecrease(data._id)} style={styles.button}>
            <Text style={styles.buttonTextde}>-</Text>
          </TouchableOpacity>

          {/* Quantity Display */}
          <Text style={styles.quantityText}>{data.quantity}</Text>

          {/* Increase Button */}
          <TouchableOpacity onPress={() => onIncrease(data._id)} style={styles.button}>
            <Text style={styles.buttonTextin}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity onPress={() => onDelete(data._id)} style={styles.deleteButton}>
        <Image style={styles.imageDelete} source={require('../icon/deleteCart.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  item: {
    width: '84%',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 3 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    marginVertical: 5,
    marginHorizontal: '3%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  detailsContainer: {
    width: '100%',
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: '#000',
    marginTop: 3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  button: {
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonTextin: {
    // height: 30,
    fontSize: 28,
    color: '#000',
  },
  buttonTextde: {
    marginBottom: 20,
    height: 30,
    fontSize: 36,
    color: '#000',
  },
  quantityText: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 50,
    marginLeft: 10,
    padding: 5,
  },
  imageDelete: {
    width: 24,
    height: 24,
  },
});

export default Item_List_History;