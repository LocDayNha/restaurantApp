import {View} from 'react-native';
import React from 'react';

const SpaceComponent = (props) => {
  const {width, height} = props;

  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
};

export default SpaceComponent;