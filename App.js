import { View, Text } from 'react-native';
import React from 'react';
import Welcome1 from './src/Main/intro/Welcome1';
import Welcome2 from './src/Main/intro/Welcome2';
import Welcome3 from './src/Main/intro/Welcome3';
import Profile from './src/Main/home/Profile';
import VerifyEmail from './src/Main/home/VerifyEmail';
import ConfirmPassword from './src/Main/home/ConfirmPassword';
import ForgotPassword from './src/Main/home/ForgotPassword';
import Welcome from './src/Main/intro/Welcome';

const App = () => {
  return (
    <SafeAreaView>
      <ForgotPassword/>
    </SafeAreaView>
      
  )
};

export default App;