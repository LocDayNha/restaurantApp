import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Login, Login2, Register } from './src/main/Login';
import { Welcome, Welcome1, Welcome2, Welcome3 } from './src/main/intro';
import {
  AppNavigator,
  ConfrimPassword,
  ForgotPassword,
  Profile,
  VerifyEmail,
  Order,
} from './src/main/home';

import {
  BookingScreen,
  ChooseTableScreen,
  DetailsScreen,
  SplashScreen,
  SuccessScreen,
  SuccessScreen_Two,
  TableSelectionScreen,
} from './src/main';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMenu from './src/main/home/HomeMenu';
import Setting from './src/main/home/Setting';
import { AppContextProvider } from './src/util/AppContext';
import VnPayWebView from './src/main/payment/VnPayWebView';
import CheckTypePayment from './src/main/payment/CheckTypePayment';
import OrderProcessing from './src/main/payment/OrderProcessing';
import LoginGoogle from './src/test/LoginGoogle';
import LoginFacebook from './src/test/LoginFacebook';
import BillScreen from './src/test/review/BillScreen';
import RatingScreen from './src/test/review/RatingScreen';
import ReviewScreen from './src/test/review/ReviewScreen';

const App = () => {
  console.warn = () => { };

  const [isShowSplash, setIsShowSplash] = useState(true);

  return (
    // <AppContextProvider>
    //   <NavigationContainer>
    //     <AppNavigator />
    //   </NavigationContainer>
    // </AppContextProvider>
    // <BillScreen/>
    <RatingScreen/>
    // <ReviewScreen/>
  );
};

export default App;
