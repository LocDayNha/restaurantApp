import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DetailsScreen from './src/screens/DetailsScreen';
import TableSelectionScreen from './src/screens/TableSelectionScreen';
import ChooseTableScreen from './src/screens/ChooseTableScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import SuccessScreen_Two from './src/screens/SuccessScreen_Two';
import BookingScreen from './src/screens/BookingScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <BookingScreen/> */}
      {/* <DetailsScreen/> */}
      {/* <SuccessScreen/> */}
      {/* <SuccessScreen_Two/> */}
      {/* <TableSelectionScreen/> */}
      {/* <ChooseTableScreen/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;