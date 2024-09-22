import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Trạng thái mới để hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái mới để hiển thị xác nhận mật khẩu
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    let valid = true;

    // Kiểm tra hợp lệ email
    if (!email) {
      setEmailError('Vui lòng nhập email của bạn');
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

    // Kiểm tra hợp lệ mật khẩu
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu của bạn');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Mật khẩu phải chứa ít nhất một chữ hoa');
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError('Mật khẩu phải chứa ít nhất một chữ thường');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Kiểm tra hợp lệ xác nhận mật khẩu
    if (!confirmPassword) {
      setConfirmPasswordError('Vui lòng xác nhận mật khẩu của bạn');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
      navigation.navigate('Login2');
    }
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
            style={[
              styles.inputEmailAndPass,
              emailError ? styles.errorInput : null,
            ]}
            value={email}
            onChangeText={setEmail}
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
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputEmailAndPass,
              styles.passwordContainer,
              confirmPasswordError ? styles.errorInput : null,
            ]}>
            <TextInput
              placeholder="Nhập lại mật khẩu"
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>
      </View>

      <View style={[styles.view2, {marginTop: '7%'}]}>
        <Pressable style={styles.btnLogin} onPress={handleRegister}>
          <Text style={[styles.textLogin, {marginTop: 10, color: '#FFF'}]}>
            Đăng ký
          </Text>
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
    flex: 1, // Cho phép TextInput chiếm không gian có sẵn
    paddingRight: 50, // Thêm padding để tránh chồng chéo với icon
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
