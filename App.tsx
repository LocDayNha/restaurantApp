import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Login, Login2, Register} from './src/main/Login';
import {Welcome, Welcome1, Welcome2, Welcome3} from './src/main/intro';
import {ForgotPassword, Profile, VerifyEmail} from './src/main/home';
import ConfirmPassword from './src/main/home/ConfirmPassword';

import {
  BookingScreen,
  ChooseTableScreen,
  DetailsScreen,
  SuccessScreen,
  SuccessScreen_Two,
  TableSelectionScreen,
} from './src/main';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Login />
      <Login2 />
      <Register />
      <Welcome1 />
      <Welcome2 />
      <Welcome3 />
      <Profile />
      <VerifyEmail />
      <ConfirmPassword />
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
      <BookingScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
