import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import DetailsScreen from './src/screens/DetailsScreen';
import TableSelectionScreen from './src/screens/TableSelectionScreen';
import ChooseTableScreen from './src/screens/ChooseTableScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <DetailsScreen /> */}
      {/* <TableSelectionScreen /> */}
      {/* <ChooseTableScreen /> */}
      <SuccessScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;