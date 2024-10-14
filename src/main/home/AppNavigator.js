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
import ChooseTableScreen from '../ChooseTableScreen';
import Setting from './Setting';
import VerifyEmail from './VerifyEmail';
import VerifyRegister from '../Login/VerifyRegister';
import BookingScreen from '../BookingScreen';
import ReservationScreen from '../DetailsScreen';

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
        name="Menu"
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
                Menu
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Món Ăn"
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
                Món Ăn
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Đặt bàn"
        component={ChooseTableScreen}
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
        name="Order"
        component={Order}
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
                Order
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Trang cá nhân"
        component={Setting}
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
      {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Login2" component={Login2} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="VerifyRegister" component={VerifyRegister} /> */}
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
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