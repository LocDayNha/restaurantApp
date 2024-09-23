import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Login, Login2, Register} from './src/main/Login';
import {Welcome, Welcome1, Welcome2, Welcome3} from './src/main/intro';
import {
  AppNavigator,
  ConfrimPassword,
  ForgotPassword,
  Profile,
  VerifyEmail,
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

import {NavigationContainer} from '@react-navigation/native';
import HomeMenu from './src/main/home/HomeMenu';

const App = () => {

  console.warn = () => {};
  
  // const [isShowSplash, setIsShowSplash] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsShowSplash(false);
  //   }, 3500);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
      {/* <StatusBar barStyle="dark-content" />
      {isShowSplash ? (
        <Welcome />
      ) : ( */}
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      {/* )} */}
    </>
  );
};

export default App;
