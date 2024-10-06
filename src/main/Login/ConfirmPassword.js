import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import AxiosInstance from '../../util/AxiosInstance';

const ConfirmPassword = (props) => {

  const { navigation, route } = props;
  const { params } = route;

  const [emailUser, setemailUser] = useState('')
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
    if (password.length < 8) {
      setMessage('Mật khẩu phải có ít nhất 8 ký tự');
      setIsSuccess(false);
    } else if (!/[A-Z]/.test(password)) {
      setMessage('Mật khẩu phải chứa ít nhất một chữ hoa');
      setIsSuccess(false);
    } else if (!/[a-z]/.test(password)) {
      setMessage('Mật khẩu phải chứa ít nhất một chữ thường');
      setIsSuccess(false);
    } else if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
      setIsSuccess(false);
    } else {
      setMessage('Mật khẩu khớp! Thành công!');
      setIsSuccess(true);
      // Điều hướng đến màn hình khác nếu cần
      // navigation.navigate('SomeScreen');
    }
  };

  const clickForgotPass = async () => {

    if (!password || !confirmPassword || password !== confirmPassword) {
      ToastAndroid.show("Vui lòng nhập đúng và đầy đủ", ToastAndroid.SHORT);
    } else {
      try {
        const forgot = await AxiosInstance().post("/user/forgotpass", { email: params.guiEmail, password: password, password2: confirmPassword });
        if (forgot) {
          ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
          navigation.navigate("Login2");
        } else {
          ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log("Forgot Password error:", error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../image/background_verify.png')}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.text}>Tạo mật khẩu mới cho riêng bạn</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor='#999'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
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
        />
        <TouchableOpacity onPress={handleConfirmPasswordVisibility} style={styles.icon1}>
          <Image
            source={showConfirmPassword ? require('../../icon/view.png') : require('../../icon/hide.png')}
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

      <TouchableOpacity onPress={clickForgotPass} style={styles.button}>
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
  profileContainer: {
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
    color: "black",
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

export default ConfirmPassword;