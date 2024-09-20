import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

const ForgotPasswordActivity = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);

  // Handle the countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeInput = (index, value) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.top}> */}
            {/* Nút quay lại sử dụng ảnh thay cho icon */}
            {/* <TouchableOpacity style={styles.backButton}> */}
                {/* <Image source={require('../../image/back.png')} style={styles.icon} />  */}
            {/* </TouchableOpacity> */}
            {/* <Text style={styles.topdes} >Xác minh OTP</Text> */}
      {/* </View> */}

      {/* OTP Input Section */}
      <Text style={styles.description}>
        Mã đã được gửi về mail
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
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

      {/* Timer and Resend Button */}
      <Text style={styles.timerText}>
        Mã sẽ được gửi lại sau {timer}s
      </Text>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton}>
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
    color:"black",
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

export default ForgotPasswordActivity;
