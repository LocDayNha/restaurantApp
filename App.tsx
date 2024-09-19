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
      {/* <TableSelectionScreen /> */}
      {/* <ChooseTableScreen /> */}
      {/* <DetailsScreen /> */}
      {/* <SuccessScreen visible={true} onClose={() => {
        console.log('close success screen');
      }} /> */}
      {/* <SuccessScreen_Two visible={true} onClose={() => {
        console.log('close success screen two');
      }} /> */}
      {/* <BookingScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
