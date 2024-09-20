import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Login, Login2, Register} from './src/main/Login';
import {Welcome, Welcome1, Welcome2, Welcome3} from './src/main/intro';
import {AppNavigator, ConfrimPassword, ForgotPassword, Profile, VerifyEmail} from './src/main/home';


import {
  BookingScreen,
  ChooseTableScreen,
  DetailsScreen,
  SuccessScreen,
  SuccessScreen_Two,
  TableSelectionScreen,
} from './src/main';
import { NavigationContainer } from '@react-navigation/native';
import HomeMenu from './src/main/home/HomeMenu';




const App = () => {
  return (
 
     <NavigationContainer>
      <AppNavigator/>
     </NavigationContainer>
    
      /* <Login />
      <Login2 />
      <Register />
      <Welcome1 />
      <Welcome2 />
      <Welcome3 />
      <Profile />
      <VerifyEmail />
      <ConfrimPassword />
      <ForgotPassword />
      <Welcome />
      <TableSelectionScreen />
      <ChooseTableScreen />
      <DetailsScreen />
      <SuccessScreen visible={true} onClose={() => {
        console.log('close success screen');
      }} />
      <SuccessScreen_Two visible={true} onClose={() => {
        console.log('close success screen two');
      }} />
      <BookingScreen /> */
  );
};


export default App;
