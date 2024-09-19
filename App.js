import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Login from './src/main/Login/Login';
import Login2 from './src/main/Login/Login2';
import Register from './src/main/Login/Register';
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