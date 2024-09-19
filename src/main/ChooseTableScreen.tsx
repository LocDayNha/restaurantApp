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
  Pressable,
} from 'react-native';

const tableImages: { [key: number]: any } = {
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

const { width } = Dimensions.get('window');

const ChooseTableScreen = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);

  const handleTablePress = (id: number) => {
    setSelectedTable(id);
  };

  const handleOutsidePress = () => {
    setSelectedTable(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Image source={require('../icon/location_icon.png')} style={styles.icon} />
            <Image source={require('../icon/notification_icon.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.headerTextContainer}>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tableContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => (
              <Pressable
                key={id}
                style={[
                  styles.table,
                  selectedTable === id && styles.selectedTable,
                  hoveredTable === id && styles.hoveredTable,
                ]}
                onHoverIn={() => setHoveredTable(id)}
                onHoverOut={() => setHoveredTable(null)}
                onPress={() => handleTablePress(id)}
                accessibilityLabel={`Table ${id}`}
              >
                <Image
                  source={tableImages[id]}
                  style={styles.tableImage}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
        {selectedTable && (
          <View style={styles.nextButtonWrapper}>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#151518',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 150,
  },
  tableContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  table: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedTable: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  hoveredTable: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  tableImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  nextButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1b20',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  nextButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#2c2c2c',
    paddingVertical: 15,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChooseTableScreen;