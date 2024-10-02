import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeMenu from './HomeMenu';
import History from './History';
import Login from '../Login/Login';
import Profile from './Profile'
import OnboardingScreen from '../Login/OnbroadingScreen';
import Order from './Order';
import OrderDetail from './OrderDetail';

import { ConfirmPassword, ForgotPassword, Login2, Register } from '../Login';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeMenu} />

    </Stack.Navigator>
  );
};

const Tabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

        },
      }}>
      <Tab.Screen
        name="Trang chu"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#95AE45' : 'black',
                }}
                source={require('../../icon/home.png')}
              />
              <Text
                style={{ color: focused ? '#95AE45' : 'black', fontSize: 13 }}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Khuyen mai"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#95AE45' : 'black',
                }}
                source={require('../../icon/promo-code.png')}
              />
              <Text
                style={{ color: focused ? '#95AE45' : 'black', fontSize: 13 }}>
                Khuyến mãi
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Thanh toan"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.checkout}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../icon/ic_tab_checkout.png')}
              />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Đặt bàn"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#95AE45' : 'black',
                }}
                source={require('../../icon/clipboard.png')}
              />
              <Text
                style={{ color: focused ? '#95AE45' : 'black', fontSize: 13 }}>
                Đặt bàn
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Đặt ghe"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#95AE45' : 'black',
                }}
                source={require('../../icon/clipboard.png')}
              />
              <Text
                style={{ color: focused ? '#95AE45' : 'black', fontSize: 13 }}>
                datghe
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Trang cá nhân"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#95AE45' : 'black',
                }}
                source={require('../../icon/user.png')}
              />
              <Text
                style={{ color: focused ? '#95AE45' : 'black', fontSize: 13 }}>
                Cá nhân
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabbar" component={Tabbar} />
    </Stack.Navigator>
  );
};

const Appnavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> */}
      <Stack.Screen name="Login2" component={Login2} />
      <Stack.Screen name = "ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword}/>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  checkout: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#95AE45',
    width: 70,
    height: 70,
    borderRadius: 35,
    top: -25,
  },
});

export default Appnavigator;