import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const initialFoodItems = [
  {
    id: '1',
    image: require('../../icon/bill.jpg'),
    price: '49$',
    tableName: '5',
    userName: 'John Doe',
    quantity: 3,
    totalPrice: '123456',
    paymentStatus: 'Chưa thanh toán',
  },
  {
    id: '2',
    image: require('../../icon/bill.jpg'),
    price: '39$',
    tableName: '14',
    userName: 'Alice Smith',
    quantity: 2,
    totalPrice: '78$',
    paymentStatus: 'Đã thanh toán',
  },
  {
    id: '3',
    image: require('../../icon/bill.jpg'),
    price: '50$',
    tableName: '6',
    userName: 'Bob Johnson',
    quantity: 1,
    totalPrice: '50$',
    paymentStatus: 'Chưa thanh toán',
  },
  {
    id: '4',
    image: require('../../icon/bill.jpg'),
    price: '25$',
    tableName: '2',
    userName: 'Emily Davis',
    quantity: 4,
    totalPrice: '100$',
    paymentStatus: 'Đã thanh toán',
  },
  {
    id: '5',
    image: require('../../icon/bill.jpg'),
    price: '60$',
    tableName: '7',
    userName: 'Chris Brown',
    quantity: 5,
    totalPrice: '300$',
    paymentStatus: 'Chưa thanh toán',
  },
];

const FoodOrderScreen = () => {
  const [foodItems, setFoodItems] = useState(initialFoodItems);

  // Hàm xóa
  const handleDelete = id => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
  };

  // Hàm ấn vào card item
  const handleCardPress = item => {
    Alert.alert(
      `Order from Table ${item.tableName}`,
      `User: ${item.userName}\nTotal Price: ${item.totalPrice}`,
    );
  };

  // Hàm bắt lỗi thanh toán thành công/thất bại
  const getPaymentStatusStyle = status => {
    return status === 'Đã thanh toán'
      ? {color: '#008001', backgroundColor: '#D4EDDA', borderColor: '#C3E6CB'} // Green
      : {color: '#FF0000', backgroundColor: '#F8D7DA', borderColor: '#F5C6CB'}; // Red
  };

  const renderItem = ({item}) => {
    const paymentStatusStyle = getPaymentStatusStyle(item.paymentStatus);

    return (
      <TouchableOpacity
        style={styles.foodCard}
        onPress={() => handleCardPress(item)}>
        <Image source={item.image} style={styles.foodImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.userInfo}>{item.userName}</Text>
          <Text style={styles.tableInfo}>
            Bàn: {item.tableName} | Số lượng: {item.quantity}
          </Text>
          <Text style={styles.totalPrice}>{item.totalPrice}</Text>
          <View
            style={[
              styles.paymentStatusContainer,
              {borderColor: paymentStatusStyle.borderColor},
            ]}>
            <Text
              style={[styles.paymentStatus, {color: paymentStatusStyle.color}]}>
              {item.paymentStatus}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Image
            source={require('../../icon/x-button.jpg')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn hàng của tôi</Text>
      <FlatList
        data={foodItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
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
    marginBottom: 40,
    paddingLeft: 30,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  foodCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 110,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    // top: -20,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    top: 15,
  },
  userInfo: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableInfo: {
    fontSize: 17,
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008001',
  },
  paymentStatusContainer: {
    borderWidth: 3,
    borderRadius: 20,
    marginTop: 5,
    width: 130,
    alignItems: 'center',
    top: -32,
    left: 70,
  },
  paymentStatus: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    alignSelf: 'center',
    top: -35,
    left: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FoodOrderScreen;
