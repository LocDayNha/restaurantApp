import {View, Text, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {appInfos} from '../constants/appInfos';
import { SpaceComponent } from '../components';
import { appColors } from '../constants/appColors';
import { Welcome } from './intro';

const SplashScreen = () => {
  return (
   <Welcome/>
  );
};

export default SplashScreen;
