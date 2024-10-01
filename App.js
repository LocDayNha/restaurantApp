import React, { useEffect, useState } from 'react';
import {
  AppNavigator,

  ConfrimPassword,
  ForgotPassword,
  Profile,
  VerifyEmail,
} from './src/main/home';

import { NavigationContainer } from '@react-navigation/native';
import HomeMenu from './src/main/home/HomeMenu';
import Setting from './src/main/home/Setting';
import { AppProvider } from './src/main/home/AppContext';

const App = () => {

  console.warn = () => { };

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
      <AppProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppProvider>

      {/* )} */}
    </>
  );
};

export default App;
