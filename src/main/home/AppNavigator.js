import { View, Text, Image, StyleSheet } from 'react-native'
import React, {useContext} from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import AppContext from './AppContext';
import HomeMenu from './HomeMenu';
import History from './History';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={HomeMenu}/>
      </Stack.Navigator>
  )
}

// const History = () => {
//   return(
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name='History' component={History}/>
//       </Stack.Navigator>
//   )
// }

const Tabbar = () => {
  return(
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            //position: 'absolute' // cho tab đè lên màn hình
          },
        }}>

        <Tab.Screen name='Trang chu' component={Home} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image style={{width:20, height: 20, tintColor: focused ? '#95AE45' : "black"}} source={require('../../icon/ic_tab_home.png')} />
              <Text style={{color: focused ? '#95AE45' : "black", fontSize: 13}}>Trang chủ</Text>
            </View>
          )
        }}/>
        <Tab.Screen name='Khuyen mai' component={History} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image style={{width:20, height: 20, tintColor: focused ? '#95AE45' : "black"}} source={require('../../icon/ic_tab_home.png')} />
              <Text style={{color: focused ? '#95AE45' : "black", fontSize: 13}}>Trang chủ</Text>
            </View>
          )
        }}/>
        <Tab.Screen name='Thanh toan' component={Home} options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.checkout}>
              <Image style={{width:40, height: 40}} source={require('../../icon/ic_tab_checkout.png')} />
            </View>
          )
        }}/>
        <Tab.Screen name='aaaa' component={Home} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image style={{width:20, height: 20, tintColor: focused ? '#95AE45' : "black"}} source={require('../../icon/ic_tab_home.png')} />
              <Text style={{color: focused ? '#95AE45' : "black", fontSize: 13}}>Trang chủ</Text>
            </View>
          )
        }}/>
        <Tab.Screen name='Dat ban' component={Home} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image style={{width:20, height: 20, tintColor: focused ? '#95AE45' : "black"}} source={require('../../icon/ic_tab_home.png')} />
              <Text style={{color: focused ? '#95AE45' : "black", fontSize: 13}}>Trang chủ</Text>
            </View>
          )
        }}/>
        
      </Tab.Navigator> 
  )
}

function Main() {
  return(
    <Stack.Navigator 
        screenOptions={{headerShown: false,}}
      >
      <Stack.Screen name='Tabbar' component={Tabbar} />

    </Stack.Navigator>
  )
}
const Appnavigator = () => {
//   const { isLogin} = useContext(AppContext);
  
//   if(!isLogin){
//     return <Loginscreen/> ;
//   }
//   else {
//     return <Main/>
//   }
    return <Main/>
}

const styles = StyleSheet.create({
  checkout: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#95AE45',
    width: 70, height: 70, 
    borderRadius: 35,
    top: -25
  }
})
export default Appnavigator