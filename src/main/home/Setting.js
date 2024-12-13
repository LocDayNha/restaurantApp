import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {AppContext} from '../../util/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';

const {width, height} = Dimensions.get('window');

const Setting = props => {
  const {navigation} = props;
  const toProfile = () => {
    navigation.navigate('Profile');
  };

  const [fullName, setFullName] = useState('');
  const [imgAvatar, setImgAvatar] = useState('');
  const [showEmail, setShowEmail] = useState('');
  const {idUser, infoUser} = useContext(AppContext);
  const {image, name, email} = infoUser;

  useEffect(() => {
    setImgAvatar(image);
    setFullName(name);
    setShowEmail(email);
  }, [infoUser]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');

      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.log('Google logout error:', error);
      }

      try {
        LoginManager.logOut();
      } catch (error) {
        console.log('Facebook logout error:', error);
      }

      // setIsLogin(false);
      // setInfoUser(null);
      // setIdUser(null);

      navigateToLogin();
    } catch (error) {
      ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại', ToastAndroid.SHORT);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login2');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.imageAvatar}
          source={
            imgAvatar ? {uri: imgAvatar} : require('../../image/user.png')
          }
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.textName}>{fullName}</Text>
        <Text style={styles.textEmail}>{showEmail}</Text>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity onPress={toProfile} style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/user.png')}
          />
          <Text style={styles.text}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('History_Table')}
        style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/armchair.png')}
          />
          <Text style={styles.text}>Đặt bàn</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/wallet.png')}
          />
          <Text style={styles.text}>Thanh toán</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/language.png')}
          />
          <Text style={styles.text}>Ngôn ngữ</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/eye.png')}
          />
          <Text style={styles.text}>Chế độ tối màu</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.icon}
            source={require('../../icon/setting/out.png')}
          />
          <Text style={[styles.text, {color: 'red'}]}>Đăng xuất</Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={require('../../icon/setting/rightarrow.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  imageAvatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  textName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 19,
  },
  textEmail: {
    color: 'black',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: '5%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '5%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  arrowIcon: {
    width: 16,
    height: 17,
  },
  text: {
    fontSize: 17.5,
  },
});
