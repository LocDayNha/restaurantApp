import React, { useState, useEffect } from 'react';
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
import AxiosInstance from '../../util/AxiosInstance';

const { width } = Dimensions.get('window');

const initialFoodItems = [
  {
    id: '1',
    price: '49$',
    tableName: 'Bàn 1',
    timeOrder: '17:34:59',
    dayOrder: '11-11-1111',
    userName: 'Nguyễn Trần Trung Quốc',
    quantity: 3,
    totalPrice: '1,200,365',
    paymentStatus: false,
  },
];

const FoodOrderScreen = (props) => {
  const { navigation } = props;
  const [foodItems, setFoodItems] = useState(null);

  const getOrder = async () => {
    try {
      const orderList = await AxiosInstance().get("/order/get");
      if (orderList) {
        console.log('Get Order List Thanh Cong');
        setFoodItems(orderList);
      } else {
        console.log('Get Order List That Bai');
      }
    } catch (error) {
      console.log('Get Order Dishes Error:', error);
    }
  };

  const clickDetail = (itemid) => {
    navigation.navigate("OrderDetail", { id: itemid });
  }

  useEffect(() => {
    getOrder();
  }, [])


  const getPaymentStatusStyle = status => {
    return status
      ? { color: '#008001', backgroundColor: '#00CC33', borderColor: '#C3E6CB' } // Green
      : { color: '#FF0000', backgroundColor: '#FF3333', borderColor: '#F5C6CB' }; // Red
  };

  const renderItem = ({ item }) => {
    const paymentStatusStyle = getPaymentStatusStyle(item.isPayment);

    return (
      <View style={styles.foodCard}>
        <View style={styles.infoContainer}>
          <Text style={[styles.tableInfo, { fontWeight: 'bold', fontSize: 25 }]}>
            Ban {item.tableNumber}
          </Text>
          <Text style={styles.tableInfo}>
            {item.nameUser}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.userInfo}>{item.timeOrder} | {item.dayOrder}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', height: 50, marginTop: '2%' }}>
            <Text style={styles.totalPrice}>{item.totalMoney} vnđ</Text>
            <TouchableOpacity onPress={() => clickDetail(item._id)} style={[styles.paymentStatusContainer, { backgroundColor: paymentStatusStyle.backgroundColor },]}>
              {
                item.paymentStatus ?
                  <Text style={[styles.paymentStatus, {}]}>Thanh Toán</Text> :
                  <Text style={[styles.paymentStatus, {}]}>Thanh Toán</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn hàng</Text>
      <FlatList
        data={foodItems}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginTop: '5%',
  },
  header: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '7%',
    marginLeft: 30,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  foodCard: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 180,
    width: '100%'
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    // top: -20,
  },
  infoContainer: {
    margin: '5%'
  },
  userInfo: {
    color: '#000',
    fontSize: 19,
  },
  tableInfo: {
    fontSize: 19,
    color: '#000',
    marginBottom: '1%'
  },
  totalPrice: {
    fontSize: 24,
    color: '#000',
    width: '60%',
    height: '100%',
    fontWeight: 'bold'
  },
  paymentStatusContainer: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  paymentStatus: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  },
  deleteButton: {
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FoodOrderScreen;
