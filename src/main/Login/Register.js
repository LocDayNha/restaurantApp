import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  CheckBox,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    if (!email || !password || !confrimPassword) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }
    if (password !== confrimPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show('Registration Successful !', ToastAndroid.SHORT);
    navigation.navigate('Login2');
  };

  return (
    <View style={{marginBottom: '5%', marginTop: '5%'}}>
      <View style={styles.view2}>
        <Image
          style={styles.image}
          source={require('../../image/a.png')}></Image>

        <Text style={styles.text}>Create Your Account</Text>
      </View>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <TextInput
          placeholder="Email"
          style={styles.inputEmailAndPass}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputEmailAndPass}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Re-enter Password"
          style={styles.inputEmailAndPass}
          secureTextEntry={true}
          value={confrimPassword}
          onChangeText={setConfrimPassword}
        />
      </View>

      <View style={[styles.view2, {marginTop: '7%'}]}>
        <Pressable style={styles.btnLogin} onPress={handleRegister}>
          <Text style={[styles.textLogin, {marginTop: 10, color: '#FFF'}]}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      <View style={[styles.view2, {marginTop: '5%'}]}>
        <Text style={styles.textor}>or continue with</Text>
      </View>

      <View style={[styles.view3, {marginTop: '5%'}]}>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/facebook.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/google.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touc}>
          <Image
            style={styles.imageTouc}
            source={require('../../image/apple.png')}></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.view3, {marginTop: '5%'}]}>
        <Text style={{fontSize: 15}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login2')}>
          <Text style={styles.textSignup}>Sign in</Text>
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
  inputEmailAndPass: {
    width: '90%',
    height: 48,
    backgroundColor: '#EEEEEE',
    borderRadius: 13,
    marginTop: '5%',
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#000',
    paddingLeft: 20,
    marginLeft: '1%',
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
});
