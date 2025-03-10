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

const tableImages = {
  1: require('../tables/chair_1.png'),
  2: require('../tables/chair_2.png'),
  3: require('../tables/chair_3.png'),
  4: require('../tables/chair_4.png'),
  5: require('../tables/chair_5.png'),
  6: require('../tables/chair_6.png'),
  7: require('../tables/chair_7.png'),
  8: require('../tables/chair_8.png'),
  9: require('../tables/chair_9.png'),
  10: require('../tables/chair_10.png'),
  11: require('../tables/chair_11.png'),
  12: require('../tables/chair_12.png'),
  13: require('../tables/chair_13.png'),
  14: require('../tables/chair_14.png'),
};

const TableSelectionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../icon/location_icon.png')}
            style={styles.icon}
          />
          <Image
            source={require('../icon/notification_icon.png')}
            style={styles.icon}
          />
        </View>
      </View>
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
    backgroundColor: '#151518',
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
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
