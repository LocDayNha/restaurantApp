
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import HomeMenu from './src/context/HomeMenu';
import Appnavigator from './src/context/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import History from './src/context/History';
const App = () => {

  return (
    <NavigationContainer>
      <Appnavigator/>
    </NavigationContainer>
    
  );
};

export default App;
