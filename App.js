<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Login, Login2, Register} from './src/main/Login';
import {Welcome, Welcome1, Welcome2, Welcome3} from './src/main/intro';
>>>>>>> main
import {
  AppNavigator,

  ConfrimPassword,
  ForgotPassword,
  Profile,
  VerifyEmail,
  Order
} from './src/main/home';

<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import HomeMenu from './src/main/home/HomeMenu';
import Setting from './src/main/home/Setting';
import { AppProvider } from './src/main/home/AppContext';
=======
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
import { createStackNavigator } from '@react-navigation/stack';
import HomeMenu from './src/main/home/HomeMenu';
import Setting from './src/main/home/Setting';
import {AppContextProvider} from './src/util/AppContext';
>>>>>>> main

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
<<<<<<< HEAD
      <AppProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppProvider>

=======
        <AppContextProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppContextProvider>
>>>>>>> main
      {/* )} */}
    </>
  );
};

export default App;
