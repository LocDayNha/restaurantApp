import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native';
import AxiosInstance from '../../util/AxiosInstance';

const VerifyEmail = (props) => {
  const { navigation } = props;

  // check mail and send code to mail
  const [emailUser, setemailUser] = useState("");
  const clickSend = async () => {
    try {
      const send = await AxiosInstance().post("/user/sent-code", { email: emailUser });
      if (send) {
        ToastAndroid.show("Đã gửi mã về Email", ToastAndroid.SHORT);
        navigation.navigate("ForgotPassword", { sentEmail: emailUser });
      } else {
        ToastAndroid.show("Kiểm tra lại Email", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Send Code to Mail error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../image/background_verify.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.text} >Nhập Email của bạn</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Email"
              placeholderTextColor='#999'
              onChangeText={setemailUser}
            />
          </View>

        </View>
        <TouchableOpacity onPress={clickSend} style={styles.button}>
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
    marginTop: '37%',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#EEEEEE',
    borderRadius: 13,
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#000',
    paddingLeft: 20,
  },
  inputContainer: {
    width: '100%',
    marginTop: '5%',
  },
  topdes: {
    color: "black",
    fontSize: 21,
    top: 35,
    left: 50,
  },
  text: {
    color: "black",
    fontSize: 20,
    left: 15,
    // zIndex: 0
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: '20%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyEmail;
