import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import AxiosInstance from '../../util/AxiosInstance';

const VerifyRegister = (props) => {

  const { navigation, route } = props;
  const { params } = route;

  const [codeInput, setcodeInput] = useState(['', '', '', '']);
  const handleCodeInput = (index, value) => {
    let newCode = [...codeInput];
    newCode[index] = value;
    setcodeInput(newCode);
  };

  useEffect(() => {
    send();
  }, [])

  const send = async () => {
    try {
      const codeSend = await AxiosInstance().post("/user/send-mail", { email: params.guiEmail });
      if (codeSend) {
        ToastAndroid.show("Đã gửi Email", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Gửi Email thất bại", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Send Code error:", error);
    }

  };

  const clickVerify = async () => {
    const numericCode = parseInt(codeInput.join(''));
    try {
      const verify = await AxiosInstance().post("/user/verify", { code: numericCode, email: params.guiEmail });
      if (verify) {
        ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
        navigation.navigate("Login2");
      } else {
        ToastAndroid.show("Xác minh thất bại", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Verify Code error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.description}>
        Nhập mã đã được gửi vè mail để xác thực
      </Text>

      <View style={styles.codeContainer}>
        {codeInput.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={value => handleCodeInput(index, value)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={clickVerify} style={styles.verifyButton}>
        <Text style={styles.verifyText}>Xác minh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    top: 240,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: "black",
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginBottom: 20,
    top: 240,
  },
  codeInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    color: "black",
  },
  timerText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#888',
    top: 245,
  },
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    top: 430,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VerifyRegister;
