import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const VerifyEmailActivity = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <View style={styles.top}> */}
            {/* Nút quay lại sử dụng ảnh thay cho icon */}
            {/* <TouchableOpacity style={styles.backButton}> */}
                {/* <Image source={require('../images/back.png')} style={styles.icon} />  */}
            {/* </TouchableOpacity> */}
            {/* <Text style={styles.topdes} >Xác minh Email của bạn</Text> */}
        {/* </View> */}
      

      {/* Ảnh hồ sơ */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../images/background_verify.png')}
          style={styles.profileImage}
        />
      </View>

      {/* Form thông tin người dùng */}
      <View style={styles.form}>
      
        <Text style={styles.text} >Nhập Email của bạn</Text>  
        {/* Email */}
        <View style={styles.inputContainer}>
        <Image source={require('../images/email.png')} style={styles.icon} /> 
          <TextInput 
            style={[styles.input, { flex: 1 }]} 
            placeholder="Email"
            placeholderTextColor='#999' 
          />
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
  profileContainer:{
    top: 80,
    left: 20,
  },
  // profileImage: {
  //   width: 333 ,
  //   height: 300 ,
  //   // borderRadius: 50,
  // },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  form: {
    marginTop: 40,
  },
  input: {
    color:"black",
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
    top: 110,
  },
  topdes: {
    color:"black",
    fontSize: 21,
    top: 35,
    left: 50,
  },
  text: {
    color: "black",
    fontSize: 20,
    top: 100,
    left: 15,
    // zIndex: 0
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 45,
    top: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyEmailActivity;
