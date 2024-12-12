import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AxiosInstance from '../../util/AxiosInstance';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AppContext } from '../../util/AppContext';

const { width } = Dimensions.get('window');

const CheckoutScreen = (props) => {
  const { route } = props;
  const { params } = route;

  const [foodItems, setFoodItems] = useState({});
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [idItemOrder, setIdItemOrder] = useState('');
  const navigation = useNavigation();
  const { setIdOrder } = useContext(AppContext)

  const getDataOrder = async () => {
    try {
      const orderList = await AxiosInstance().get("/order/getById/" + params.id);
      if (orderList) {
        setFoodItems(orderList.list);
        setList(orderList.list.dishes);
        setTotalPrice(orderList.list.totalMoney);
        setIdItemOrder(orderList.list._id);
      } else {
        console.log('Get Order List By Id That Bai');
      }
    } catch (error) {
      console.log('Get Order List By Id Error:', error);
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'vnd'); // Thay ký hiệu "₫" bằng "vnđ" nếu cần
  };

  const clickUpdateDishes = () => {
    setIdOrder(params.id);
    console.log(params.id)
    navigation.navigate('Main', {
      screen: 'Tabbar',
      params: { screen: 'HomeMenu' },
    });
  }

  useEffect(() => {
    getDataOrder();
  }, [])


  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image source={{ uri: item.image }} style={styles.orderImage} />
      <View style={{ width: '75%', marginLeft: '5%' }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={[styles.price, { marginTop: '10%' }]}>{formatCurrency(item.price)}</Text>
        <View style={styles.quantityContainer}>
          {/* <TouchableOpacity
    style={styles.quantityButton}
    onPress={() => decreaseQuantity(item.id)}>
    <Text style={styles.quantityButtonTextt}>-</Text>
  </TouchableOpacity> */}
          <Text style={styles.quantityText}>{item.quantity}</Text>
          {/* <TouchableOpacity
    style={styles.quantityButton}
    onPress={() => increaseQuantity(item.id)}>
    <Text style={styles.quantityButtonTextc}>+</Text>
  </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách món ăn</Text>

      {/* Food List */}
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <TouchableOpacity onPress={clickUpdateDishes} style={{ marginLeft: '48%', marginTop: '3%', width: 30, height: 30 }}>
            <Image style={{ width: 30, height: 30 }} source={require('../../icon/add.png')}></Image>
          </TouchableOpacity >
        }
        ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
      />

      {/* Total Section */}
      {/* Customer and Table Information */}

      {/* <TouchableOpacity onPress={() => { storeData(data) }} style={{ marginLeft: '90%' }}>
        <Image style={{ width: 30, height: 30 }} source={require('../../icon/add.png')}></Image>
      </TouchableOpacity > */}

      <View style={styles.totalContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số Bàn</Text>
          <Text style={styles.infoValue}>{foodItems?.numberTable}</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Số Lượng Món Ăn</Text>
          <Text style={styles.priceValue}>{foodItems?.quantity}</Text>
        </View>
        <View style={styles.priceRowTotal}>
          <Text style={styles.priceLabelTotal}>Tổng</Text>
          <Text style={styles.priceValueTotal}>{formatCurrency(foodItems?.totalMoney)}</Text>
        </View>
      </View>
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
    marginLeft: '3%',
    marginRight: '3%'
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
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
    width: '25%',
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityContainer: {
    marginLeft: '85%'
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
    color: 'black',
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
    color: 'black',
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
    marginBottom:'5%'
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
    width: '66%'
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
