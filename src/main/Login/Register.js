import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../util/AxiosInstance';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigation = useNavigation();

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Vui lòng nhập email');
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Vui lòng nhập email hợp lệ');
        valid = false;
      } else {
        setEmailError('');
      }
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Vui lòng nhập lại mật khẩu');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu và xác nhận mật khẩu không khớp');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true

    let data = {
      email,
      password,
      password2: confirmPassword,
      createAt: new Date(),
    };

    try {
      const response = await AxiosInstance().post('/user/register', data);

      if (response && response.status) {
        ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
        navigationToForgotPassword();
      } else {
        ToastAndroid.show('Đăng ký thất bại!', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const navigationToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={{marginBottom: '5%', marginTop: '5%'}}>
      <View style={styles.view2}>
        <Image style={styles.image} source={require('../../image/a.png')} />
        <Text style={styles.text}>Tạo tài khoản</Text>
      </View>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={[styles.inputEmailAndPass, emailError && styles.errorInput]}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.passwordContainer,
              passwordError && styles.errorInput,
            ]}>
            <TextInput
              placeholder="Mật khẩu"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconContainer}>
              <Image
                source={
                  showPassword
                    ? require('../../icon/view.png')
                    : require('../../icon/hide.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.passwordContainer,
              confirmPasswordError && styles.errorInput,
            ]}>
            <TextInput
              placeholder="Nhập lại mật khẩu"
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.iconContainer}>
              <Image
                source={
                  showConfirmPassword
                    ? require('../../icon/view.png')
                    : require('../../icon/hide.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}
        </View>
      </View>

      <View style={[styles.view2, {marginTop: '7%'}]}>
        <Pressable style={styles.btnLogin} onPress={handleRegister}>
          {loading ? ( // Show ActivityIndicator when loading
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={[styles.textLogin, {marginTop: 10, color: '#FFF'}]}>
              Đăng ký
            </Text>
          )}
        </Pressable>
      </View>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <Text style={styles.textor}>hoặc tiếp tục với</Text>
      </View>

      <View style={[styles.view3, {marginTop: '5%'}]}>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/facebook.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/google.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/apple.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.view3, {marginTop: '5%'}]}>
        <Text style={{fontSize: 15}}>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login2')}>
          <Text style={styles.textSignup}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  view2: {
    alignItems: 'center',
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    width: '90%',
    marginTop: '5%',
  },
  inputEmailAndPass: {
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
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  btnLogin: {
    height: 50,
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textLogin: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#000',
    marginBottom: 7,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  textor: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
  },
  touc: {
    height: 60,
    width: 80,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderColor: '#DDDDDD',
    marginLeft: '3%',
    marginRight: '3%',
  },
  imageTouc: {
    height: 30,
    width: 30,
  },
  textSignup: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
    marginLeft: '5%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: '#EEEEEE',
    borderRadius: 13,
    paddingLeft: 20,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
