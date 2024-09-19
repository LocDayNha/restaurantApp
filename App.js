import { View, Text } from 'react-native';
import React from 'react';
import Welcome1 from './src/main/intro/Welcome1';
import Welcome2 from './src/main/intro/Welcome2';
import Welcome3 from './src/main/intro/Welcome3';
import Profile from './src/main/home/Profile';
import VerifyEmail from './src/main/home/VerifyEmail';
import ConfirmPassword from './src/main/home/ConfirmPassword';
import ForgotPassword from './src/main/home/ForgotPassword';
import Welcome from './src/main/intro/Welcome';

const App = () => {
  return (
    <SafeAreaView>
      <ForgotPassword/>
    </SafeAreaView>
      
  )
};

export default App;