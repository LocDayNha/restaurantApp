import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
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

const ChooseTableScreen = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleTablePress = (id) => {
    setSelectedTable(id);
  };

  const handleOutsidePress = () => {
    setSelectedTable(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              {[1, 2, 3].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.table, id === 1 && isHovered && styles.hoveredTable]}
                  onPress={() => handleTablePress(id)}
                  onPressIn={() => id === 1 && setIsHovered(true)}
                  onPressOut={() => id === 1 && setIsHovered(false)}
                >
                  {selectedTable === id && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={tableImages[id]} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[4, 5, 6].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={styles.table}
                  onPress={() => handleTablePress(id)}
                >
                  {selectedTable === id && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={tableImages[id]} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[7, 8, 9].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={styles.table}
                  onPress={() => handleTablePress(id)}
                >
                  {selectedTable === id && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={tableImages[id]} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[10, 11, 12].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.table, (id === 11 || id === 12) && styles.tableRight]}
                  onPress={() => handleTablePress(id)}
                >
                  {selectedTable === id && (
                    <View style={id === 12 ? styles.selectedBackgroundLarge : styles.selectedBackground} />
                  )}
                  <Image
                    source={tableImages[id]}
                    style={id === 12 ? styles.tableImageLarge : styles.tableImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[13, 14].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.table, id === 14 && styles.tableRight]}
                  onPress={() => handleTablePress(id)}
                >
                  {selectedTable === id && (
                    <View style={styles.selectedBackgroundLarge} />
                  )}
                  <Image source={tableImages[id]} style={styles.tableImageLarge} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {selectedTable && (
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
  hoveredTable: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  selectedBackground: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 10,
    zIndex: -1,
  },
  selectedBackgroundLarge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 10,
    zIndex: -1,
  },
  tableImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  tableImageLarge: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 15,
    width: '90%',
    backgroundColor: '#2c2c2c',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChooseTableScreen;