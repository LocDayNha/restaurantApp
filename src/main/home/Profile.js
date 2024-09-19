import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const ProfileScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.top}>
          {/* Nút quay lại sử dụng ảnh thay cho icon */}
            <TouchableOpacity style={styles.backButton}>
              <Image source={require('../icon/back.png')} style={styles.icon} /> 
            </TouchableOpacity>
            {/* <Text style={styles.topdes}>Điền thông tin của bạn</Text> */}
        </View>
      

      {/* Ảnh hồ sơ */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../image/food.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.icon1}>
          <Image source={require('../icon/pencil.png')} style={styles.icon} /> 
        </TouchableOpacity>
      </View>

      {/* Form thông tin người dùng */}
      <View style={styles.form}>
        {/* Tên đầy đủ */}
        
        <View style={styles.inputContainer}>
        <Image source={require('../icon/user.png')} style={styles.icon} /> 
          <TextInput 
          style={styles.input} 
          placeholder="Họ và tên"
          placeholderTextColor='#999'/>
          </View>
        
        {/* Nickname
        <View style={styles.inputContainer}>
        <Image source={require('../image/user.png')} style={styles.icon} /> 
          <TextInput 
          style={styles.input} 
          placeholder="Name"/>
          </View>
         */}
        {/* Ngày sinh */}
        <View style={styles.inputContainer}>
        <Image source={require('../icon/calendar.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Ngày, tháng, năm sinh" 
            placeholderTextColor='#999' 
          />
          
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
        <Image source={require('../icon/location.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Địa chỉ" 
            placeholderTextColor='#999' 
          />
          
        </View>

        {/* Số điện thoại */}
        <View style={styles.inputContainer}>
          <Image source={require('../icon/phone-call.png')} style={styles.icon} />
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Số điện thoại" 
            placeholderTextColor='#999' 
          />
        </View>

        {/* Giới tính */}
        <View style={styles.inputContainer}>
          <Image source={require('../icon/gender.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Giới tính" 
            placeholderTextColor='#999' />
        </View>

        </View>
        {/* Nút Continue */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  icon1: {
    width: 35,
    height: 30,
    top: 75,
    right: 115,
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 0,
    borderColor:"black",
  },
  topdes: {
    color:"black",
    fontSize: 21,
    top: 35,
    left: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 1,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  form: {
    marginTop: 40,
  },
  input: {
    // color:"red",
    backgroundColor: '#F5F5F5',
    // paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    // marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 45,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
