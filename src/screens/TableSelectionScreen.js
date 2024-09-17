import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

// Import images
const tableImages = {
  1: require('../assets/tables/chair_1.png'),
  2: require('../assets/tables/chair_2.png'),
  3: require('../assets/tables/chair_3.png'),
  4: require('../assets/tables/chair_4.png'),
  5: require('../assets/tables/chair_5.png'),
  6: require('../assets/tables/chair_6.png'),
  7: require('../assets/tables/chair_7.png'),
  8: require('../assets/tables/chair_8.png'),
  9: require('../assets/tables/chair_9.png'),
  10: require('../assets/tables/chair_10.png'),
  11: require('../assets/tables/chair_11.png'),
  12: require('../assets/tables/chair_12.png'),
  13: require('../assets/tables/chair_13.png'),
  14: require('../assets/tables/chair_14.png'),
};

const { width, height } = Dimensions.get('window');

const TableSelectionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[1]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[2]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[3]} style={styles.tableImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[4]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[5]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[6]} style={styles.tableImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[7]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[8]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[9]} style={styles.tableImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[10]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.table, styles.tableRight]}>
            <Image source={tableImages[11]} style={styles.tableImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.table, styles.tableRight]}>
            <Image source={tableImages[12]} style={styles.tableImageLarge} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.table}>
            <Image source={tableImages[13]} style={styles.tableImageLarge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.table, styles.tableRight]}>
            <Image source={tableImages[14]} style={styles.tableImageLarge} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  tableContainer: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  table: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    position: 'relative',
  },
  tableRight: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  tableImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  tableImageLarge: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default TableSelectionScreen;