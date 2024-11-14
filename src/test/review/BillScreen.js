import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity,Image  } from 'react-native';

const initialProducts = [
  { id: '1', name: 'Gỏi gà', price: 45000, quantity: 1 },
  { id: '2', name: 'Gà rán', price: 100000, quantity: 2 },
  { id: '3', name: 'Hamberger', price: 35000, quantity: 1 },
  { id: '4', name: 'Bò bít tết', price: 100000, quantity: 1 },
];

const BillScreen = () => {
  const [products, setProducts] = useState(initialProducts);
  const VAT_RATE = 0.01; // VAT 1%

  // Tính tổng tiền của món ăn
  const calculateTotalAmount = () => {
    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    return total;
  };
  const priceTotal = () => {
    const total = products.reduce((sum, product) => sum + product.quantity, 0);
    return total;
  };

  // Tính phí VAT
  const calculateVAT = (totalAmount) => {
    return totalAmount * VAT_RATE;
  };

  // Tính tổng tiền sau khi cộng phí VAT
  const totalAmount = calculateTotalAmount();
  const vatAmount = calculateVAT(totalAmount);
  const totalAmountWithVAT = totalAmount + vatAmount;
  const totalQuantity = priceTotal();

  // Xử lý thanh toán
  const handlePayment = () => {
    alert('Thanh toán thành công! Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.');
  };

  return (
    <View style={styles.container}>
       {/* <View style={styles.backButtonContainer}>
        <TouchableOpacity>
          <Image 
            source={require('../icon/back.png')} 
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
      </View> */}
      {/* Tiêu đề */}
      <Text style={styles.header}>HÓA ĐƠN THANH TOÁN</Text>

      {/* Thông tin người dùng
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Khách hàng: Đỗ Văn Vỹ</Text>
        <Text style={styles.userEmail}>Email: dovanvy2003@gmail.com</Text>
        <Text style={styles.userPhone}>SĐT: 0901234567</Text>
        <Text style={styles.day}>Ngày: 01/10/2024</Text>
        <Text style={styles.time}>Giờ: 9:10:25</Text>
      </View> */}

      {/* Danh sách sản phẩm */}
      <Text style={styles.sectionTitle}>Danh Sách Sản Phẩm</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productPrice}>{item.price.toLocaleString()}</Text>

             {/* Số lượng */}
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{item.quantity}</Text>
              </View>
            </View>
          </View>
        )}
      />
       <View style={styles.ViewtotalAmount}>
      <Text style={styles.totalAmount}>Số lượng: </Text>
      <Text style={styles.totalAmount}>{totalQuantity.toLocaleString()}</Text>
      </View>
      {/* Tổng tiền */}
      <View style={styles.ViewtotalAmount}>
      <Text style={styles.totalAmount}>Tổng tiền: </Text>
      <Text style={styles.totalAmount}>{totalAmount.toLocaleString()}</Text>
      </View>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.textpn}>Phoenix Restaurant</Text>
        <Text style={styles.textpn}>phoenixrestaurant13@gmail.com</Text>
      </View>

      {/* Nút thanh toán */}
      {/* <View  style={styles.Viewpayment}>
      <TouchableOpacity style={styles.total} >
          <Text style={styles.texttotal} onPress={handlePayment}>Xác Nhận Thanh Toán</Text>
        </TouchableOpacity>
      </View> */}
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', 
  },
  backButtonContainer: {
    position: 'absolute', 
    top: 20,  
    left: 15, 
    zIndex: 1, 
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',  
  },
  userInfo: {
    marginBottom: 20,
    padding: 10,
    borderColor:'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',  
  },
  userEmail: {
    fontSize: 16,
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    color: '#333',
  },
  day: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',  
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  productName: {
    fontSize: 16,
    color: '#333',  
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',  
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: 30,
    textAlign: 'center',
  },
  totalAmountContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',  
    borderRadius: 5,
    marginBottom: 20,
    borderColor:'black',
    borderWidth: 1,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
    marginBottom: 5,
  },
  textpn: {
    fontSize: 16,
    color: '#000',  // 
    textAlign: 'center',
    marginBottom: 5,
  },
  total:{
    backgroundColor: '#000',  
    width:240,
    height: 40,
    borderRadius:10,
    top:20
  },
  texttotal:{
    color: '#FFFFFF',  
    textAlign: 'center',
    fontSize: 18,
    top:5,
  },
  Viewpayment:{
    justifyContent: 'center',
      alignItems: 'center',
  },
  ViewtotalAmount:{
    marginTop:'5%',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default BillScreen;
