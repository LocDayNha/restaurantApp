import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  BookingScreen,
  ChooseTableScreen,
  DetailsScreen,
  SuccessScreen,
  SuccessScreen_Two,
  TableSelectionScreen,
} from './src/screens';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <BookingScreen />
      <ChooseTableScreen />
      <DetailsScreen />
      <SuccessScreen />
      <SuccessScreen_Two />
      <TableSelectionScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
