import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../util/AppContext';
import AxiosInstance from '../../util/AxiosInstance';

const Setting = (props) => {
  const { navigation } = props;
  const toProfile = () => {
    navigation.navigate("Profile")
  };

  const [fullName, setFullName] = useState('');
  const [imgAvatar, setImgAvatar] = useState('');
  const [showEmail, setShowEmail] = useState('');
  const { idUser, infoUser } = useContext(AppContext);
  const { image, name, email } = infoUser;

  useEffect(() => {
    setImgAvatar(image),
      setFullName(name),
      setShowEmail(email)
  }, [infoUser])


  return (
    <View style={{ margin: '5%' }}>

      <View style={[styles.view2, { marginBottom: '5%' }]}>
        <TouchableOpacity style={[styles.view3, { alignItems: 'center', width: 110, height: 110 }]}>
          {
            imgAvatar ?
              <Image style={styles.imageAvatar} source={{ uri: imgAvatar }} ></Image> :
              <Image style={styles.imageAvatar} source={require('../../image/user.png')} ></Image>
          }
        </TouchableOpacity>
      </View>

      <View style={[styles.view2, { marginBottom: '5%' }]}>
        <Text style={[styles.textName, { fontWeight: 'bold', color: 'black' }]}>{fullName}</Text>
        <Text style={{ color: 'black' }}>{showEmail}</Text>
      </View>

      <View style={[styles.view2, { borderBottomWidth: 1, borderColor: '#DDDDDD', marginBottom: '5%' }]}></View>

      <TouchableOpacity onPress={toProfile} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '77%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/user.png')}></Image>
          <Text style={styles.text}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('History_Table')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '28.5%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/armchair.png')}></Image>
          <Text style={styles.text}>Đặt bàn</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '37%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/wallet.png')}></Image>
          <Text style={styles.text}>Thanh toán</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '34%' }}>
          <Image style={[styles.icon, { width: 20, height: 20 }]} source={require('../../icon/setting/language.png')}></Image>
          <Text style={styles.text}>Ngôn ngữ</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '47%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/eye.png')}></Image>
          <Text style={styles.text}>Chế độ tối màu</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '34.5%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/out.png')}></Image>
          <Text style={[styles.text, { color: 'red' }]}>Đăng xuất</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  view2: {

    alignItems: 'center'
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageAvatar: {
    width: 110,
    height: 110,
    borderRadius:50
  },
  iconEdit: {
    width: 25,
    height: 25,
    marginTop: '70%',
    marginLeft: "-25%"
  },
  textName: {
    fontFamily: 'Urbanist',
    fontSize: 19,
  },
  icon: {
    height: 18,
    width: 17
  },
  text: {
    fontFamily: 'Urbanist',
    fontSize: 17.5,
  }
})