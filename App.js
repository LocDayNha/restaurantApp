import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TableSelectionScreen from './src/screens/TableSelectionScreen'
import ChooseTableScreen from './src/screens/ChooseTableScreen'

const App = () => {
  return (
    <View>
      <TableSelectionScreen />
      {/* <ChooseTableScreen /> */}

    </View>
  )
}

export default App

const styles = StyleSheet.create({})