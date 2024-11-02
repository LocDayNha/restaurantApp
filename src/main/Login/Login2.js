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
import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../util/AppContext';
import AxiosInstance from '../../util/AxiosInstance';

const Login2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const navigation = useNavigation();
  const {setIsLogin, setInfoUser, setIdUser} = useContext(AppContext);

  const validationForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Vui lòng nhập email');y
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

    return valid;
  };

  const onLogin = async () => {
    if (!validationForm()) {
      return;
    }

    setLoading(true); // Set loading to true

    let data = {email, password};
    console.log(data);

    try {
      const response = await AxiosInstance().post('/user/login', data);
      console.log(response);

      if (response && response.status) {
        const {token, user} = response.returnData.data;
        await AsyncStorage.setItem('token', token);
        setIsLogin(true);
        setInfoUser(user);
        setIdUser(user._id);
        console.log('Đăng nhập thành công')
        navigateToMain();
      } else {
        ToastAndroid.show('Thông tin đăng nhập sai', ToastAndroid.SHORT);
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

  const navigateToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{marginBottom: '5%', marginTop: '5%'}}>
      <View style={styles.view2}>
        <Image style={styles.image} source={require('../../image/a.png')} />
        <Text style={styles.text}>Đăng nhập vào tài khoản</Text>
      </View>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={[
              styles.inputEmailAndPass,
              emailError ? styles.errorInput : null,
            ]}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (text) setEmailError('');
            }}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputEmailAndPass,
              styles.passwordContainer,
              passwordError ? styles.errorInput : null,
            ]}>
            <TextInput
              placeholder="Mật khẩu"
              style={[styles.passwordInput]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (text) setPasswordError('');
              }}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                style={styles.icon}
                source={
                  showPassword
                    ? require('../../icon/view.png')
                    : require('../../icon/hide.png')
                }
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.view2, {marginTop: '5%'}]}
        onPress={() => navigation.navigate('VerifyEmail')}>
        <Text style={[styles.textLogin, {color: '#000'}]}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <Pressable style={styles.btnLogin} onPress={onLogin}>
          {loading ? ( // Show ActivityIndicator when loading
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={[styles.textLogin, {marginTop: 10, color: '#FFF'}]}>
              Đăng nhập
            </Text>
          )}
        </Pressable>
      </View>

      <View style={[styles.view2, {marginTop: '7%'}]}>
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
        <Text style={{fontSize: 15}}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textSignup}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login2;

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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
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
});