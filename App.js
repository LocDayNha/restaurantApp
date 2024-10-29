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

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMenu from './src/main/home/HomeMenu';
import Setting from './src/main/home/Setting';
import {AppContextProvider} from './src/util/AppContext';
import LoginGoogle from './src/test/LoginGoogle';
import LoginFacebook from './src/test/LoginFacebook';

const App = () => {
  console.warn = () => {};

  const [isShowSplash, setIsShowSplash] = useState(true);

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
      {/* <AppContextProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppContextProvider> */}
      {/* <LoginGoogle /> */}
      <LoginFacebook />
      {/* )} */}
    </>
  );
};

export default App;
