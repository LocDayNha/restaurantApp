import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const ProfileScreen = (props) => {
  const {navigation} = props
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../icon/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      

      {/* Ảnh hồ sơ */}
        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={profileImage} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../../image/food.jpg')}
              style={styles.profileImage}
            />
          )}
          <TouchableOpacity style={styles.icon1} onPress={handleChoosePhoto}>
            <Image
              source={require('../../icon/pencil.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

      {/* Form thông tin người dùng */}
      <View style={styles.form}>

        {/* Tên đầy đủ */}
        <View style={styles.inputContainer}>
        <Image source={require('../../icon/user.png')} style={styles.icon} /> 
          <TextInput 
          style={styles.input} 
          placeholder="Họ và tên"
          placeholderTextColor='#999'/>
          </View>
        
        {/* Nickname
        <View style={styles.inputContainer}>
        <Image source={require('../../image/user.png')} style={styles.icon} /> 
          <TextInput 
          style={styles.input} 
          placeholder="Name"/>
          </View>
         */}
        {/* Ngày sinh */}
        <View style={styles.inputContainer}>
        <Image source={require('../../icon/calendar.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Ngày, tháng, năm sinh" 
            placeholderTextColor='#999' 
          />
          
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
        <Image source={require('../../icon/location.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Địa chỉ" 
            placeholderTextColor='#999'
            value={email}
            onChangeText={(text) => setEmail(text)} 
          />
          
        </View>

        {/* Số điện thoại */}
        <View style={styles.inputContainer}>
          <Image source={require('../../icon/phone-call.png')} style={styles.icon} />
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Số điện thoại" 
            placeholderTextColor='#999' 
          />
        </View>

        {/* Giới tính */}
        <View style={styles.inputContainer}>
          <Image source={require('../../icon/gender.png')} style={styles.icon} /> 
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
    paddingLeft: 6,
    borderColor: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 1,
  },
  form: {
    marginTop: 40,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
  },
  inputContainerError: {
    borderColor: 'red',
    borderWidth: 1,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
});

export default ProfileScreen;
