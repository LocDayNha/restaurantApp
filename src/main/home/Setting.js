import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Setting = () => {
  return (
    <View style={{ margin: '5%' }}>

      <View style={[styles.view2, { marginBottom: '5%' }]}>
        <TouchableOpacity style={[styles.view3, { alignItems: 'center', width: 110, height: 110 }]}>
          <Image style={styles.imageAvatar} source={require('../../image/user.png')} ></Image>
          <Image style={styles.iconEdit} source={require('../../icon/setting/edit.png')} ></Image>
        </TouchableOpacity>
      </View>

      <View style={[styles.view2, { marginBottom: '5%' }]}>
        <Text style={[styles.textName, { fontWeight: 'bold', color: 'black' }]}>Olivier Giroud</Text>
        <Text style={{ color: 'black' }}>vohoangloc200@gmail.com</Text>
      </View>

      <View style={[styles.view2, { borderBottomWidth: 1, borderColor: '#DDDDDD', marginBottom: '5%' }]}></View>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '33%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/user.png')}></Image>
          <Text style={styles.text}>Edit Profile</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '27%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/location.png')}></Image>
          <Text style={styles.text}>Address</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '34.5%' }}>
          <Image style={[styles.icon, { height: 20, width: 20 }]} source={require('../../icon/setting/notification.png')}></Image>
          <Text style={styles.text}>Notification</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '28.5%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/wallet.png')}></Image>
          <Text style={styles.text}>Payment</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '26.5%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/security.png')}></Image>
          <Text style={styles.text}>Security</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '31%' }}>
          <Image style={[styles.icon, { width: 20, height: 20 }]} source={require('../../icon/setting/language.png')}></Image>
          <Text style={styles.text}>Language</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '33%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/eye.png')}></Image>
          <Text style={styles.text}>Dark Mode</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/lock.png')}></Image>
          <Text style={styles.text}>Privacy Policy</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '35.5%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/support.png')}></Image>
          <Text style={styles.text}>Help Center</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '39.3%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/friends.png')}></Image>
          <Text style={styles.text}>Invite Friends</Text>
        </View>
        <Image style={[styles.icon, { width: 16, height: 17 }]} source={require('../../icon/setting/rightarrow.png')}></Image>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '5%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '25%' }}>
          <Image style={styles.icon} source={require('../../icon/setting/out.png')}></Image>
          <Text style={[styles.text, {color:'red'}]}>Logout</Text>
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
    height: 110
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