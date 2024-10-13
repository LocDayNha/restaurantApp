import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const initialFoodItems = [
  {
    id: '1',
    title: 'Macaroni Pasta',
    image: require('../../image/macaroni_pasta.png'),
    rating: 5,
    price: 49,
    quantity: 1,
  },
  {
    id: '2',
    title: 'Rotini Pasta',
    image: require('../../image/macaroni_pasta.png'),
    rating: 4.5,
    price: 39,
    quantity: 1,
  },
  {
    id: '3',
    title: 'Mixed Pasta',
    image: require('../../image/macaroni_pasta.png'),
    rating: 4.5,
    price: 49,
    quantity: 1,
  },
  {
    id: '4',
    title: 'Fettuccine Pasta',
    image: require('../../image/macaroni_pasta.png'),
    rating: 4,
    price: 39,
    quantity: 1,
  },
  {
    id: '5',
    title: 'Broccoli Pasta',
    image: require('../../image/macaroni_pasta.png'),
    rating: 4,
    price: 49,
    quantity: 1,
  },
];

const CheckoutScreen = () => {
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [tableNumber, setTableNumber] = useState('Table 5');
  const [customerName, setCustomerName] = useState('John Doe');

  const increaseQuantity = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotalQuantity = () => {
    const totalQuantity = foodItems.reduce((acc, item) => acc + item.quantity, 0);
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    const totalAmount = foodItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return totalAmount.toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image source={item.image} style={styles.orderImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.quantityButtonTextt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.quantityButtonTextc}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      

      {/* Food List */}
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Total Section */}
      {/* Customer and Table Information */}
      <View style={styles.totalContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Customer Name:</Text>
          <Text style={styles.infoValue}>{customerName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Table Number:</Text>
          <Text style={styles.infoValue}>{tableNumber}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Amount (Total Items)</Text>
          <Text style={styles.priceValue}>{calculateTotalQuantity()}</Text>
        </View>
        <View style={styles.priceRowTotal}>
          <Text style={styles.priceLabelTotal}>Total Price</Text>
          <Text style={styles.priceValueTotal}>${calculateTotalPrice()}</Text>
        </View>
      </View>

      {/* Continue to Payment Button */}
      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    paddingLeft: 20,
  },
  
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  orderCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 100,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008001',
    top: 5,
    left: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
    left: 60,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 10,
  },
  quantityButton: {
    padding: 10,
    borderRadius: 5,
    top: -1,
  },
  quantityButtonTextc: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  quantityButtonTextt: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  // infoContainer: {
  //   paddingHorizontal: 20,
  //   marginBottom: 5,
  // },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  totalContainer: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  priceValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  priceRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceValueTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
