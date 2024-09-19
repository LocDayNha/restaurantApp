import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CreatePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(''); // Trạng thái để lưu trữ thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái để lưu trữ kết quả thành công hoặc thất bại

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleContinue = () => {
    if (password === confirmPassword && password.length > 0) {
      console.log('Thành công')
      setMessage('Password match! Success!'); // Mật khẩu khớp
      setIsSuccess(true); // Thành công
    } else {
      console.log('Thất bại')
      setMessage('Passwords do not match. Failure.'); // Mật khẩu không khớp
      setIsSuccess(false); // Thất bại
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.top}> */}
            {/* Nút quay lại sử dụng ảnh thay cho icon */}
            {/* <TouchableOpacity style={styles.backButton}> */}
                {/* <Image source={require('../images/back.png')} style={styles.icon} />  */}
            {/* </TouchableOpacity> */}
            {/* <Text style={styles.topdes} >Tạo mật khẩu mới</Text> */}
      {/* </View> */}

      <View style={styles.profileContainer}>
        <Image
          source={require('../../images/background_verify.png')}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.text} >Tạo mật khẩu mới cho riêng bạn</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor='#999' 
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          // autoCapitalize="none"
          // autoCorrect={false}
        />
        <TouchableOpacity onPress={handlePasswordVisibility} style={styles.icon1}>
          <Image 
            source={showPassword ? require('../../icon/view.png') : require('../../icon/hide.png')}
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Xác nhận lại mật khẩu"
          placeholderTextColor='#999' 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          // autoCapitalize="none"
          // autoCorrect={false}
        />
         <TouchableOpacity onPress={handleConfirmPasswordVisibility} style={styles.icon1}>
          <Image 
            source={showPassword ? require('../../icon/view.png') : require('../../icon/hide.png')}
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông báo */}
      {message ? (
        <Text style={[styles.message, isSuccess ? styles.success : styles.failure]}>
          {message}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Hoàn tất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  profileContainer:{
    top: 40,
    left: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  topdes: {
    color:"black",
    fontSize: 21,
    top: 35,
    left: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    top: 110,
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
    top: 90,
    left: -5,
    // zIndex: 0
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  button: {
    top: 100,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    top: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    top: 100,
  },
  success: {
    color: '#28a745', // Màu xanh cho thành công
    backgroundColor: '#d4edda',
  },
  failure: {
    color: '#dc3545', // Màu đỏ cho thất bại
    backgroundColor: '#f8d7da',
  },
});

export default CreatePasswordScreen;
