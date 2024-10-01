import React, { useState, useContext } from 'react';
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
import { useAppContext } from './home/AppContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ChooseTableScreen = ({ props, navigation }) => {  
  // const navigation = useNavigation();
  const { addBooking, bookingData, setBookingData } = useAppContext();

  const [selectedTable, setSelectedTable] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const handleTablePress = idTable => {
    setSelectedTable(idTable);
  };
  const handleOutsidePress = () => {
    setSelectedTable(null);
  };
  const handleNext = () => {
    const newBookingData = table.find((item) => item.idTable === selectedTable.toString());
    addBooking(newBookingData);
    navigation.navigate('DetailsScreen', { bookingData: newBookingData });
  };
  // get and format time
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  // get and format date
  const currentDate = new Date();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  // Danh sách bàn tại nhà hàng (test)
  const table = [
    {
      idTable: '1',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '1',
      tableImage: require('..//tables/chair_1.png'),
    },
    {
      idTable: '2',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '2',
      tableImage: require('..//tables/chair_2.png'),
    },
    {
      idTable: '3',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '3',
      tableImage: require('..//tables/chair_3.png'),
    },
    {
      idTable: '4',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '4',
      tableImage: require('..//tables/chair_4.png'),
    },
    {
      idTable: '5',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '5',
      tableImage: require('..//tables/chair_5.png'),
    },
    {
      idTable: '6',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '6',
      tableImage: require('..//tables/chair_6.png'),
    },
    {
      idTable: '7',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '7',
      tableImage: require('..//tables/chair_7.png'),
    },
    {
      idTable: '8',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '8',
      tableImage: require('..//tables/chair_8.png'),
    },
    {
      idTable: '9',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '9',
      tableImage: require('..//tables/chair_9.png'),
    },
    {
      idTable: '10',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '10',
      tableImage: require('..//tables/chair_10.png'),
    },
    {
      idTable: '11',
      date: formattedDate,
      time: formattedTime,
      seat: '4',
      tableNumber: '11',
      tableImage: require('..//tables/chair_11.png'),
    },
    {
      idTable: '12',
      date: formattedDate,
      time: formattedTime,
      seat: '6',
      tableNumber: '12',
      tableImage: require('..//tables/chair_12.png'),
    },
    {
      idTable: '13',
      date: formattedDate,
      time: formattedTime,
      seat: '6',
      tableNumber: '13',
      tableImage: require('..//tables/chair_13.png'),
    },
    {
      idTable: '14',
      date: formattedDate,
      time: formattedTime,
      seat: '6',
      tableNumber: '14',
      tableImage: require('..//tables/chair_14.png'),
    },
  ]


  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}  >
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              {[1, 2, 3].map((idTable) => (
                <TouchableOpacity
                  key={idTable}
                  style={[
                    styles.table,
                    idTable === 1 && isHovered && styles.hoveredTable,
                  ]}
                  onPress={() => {
                    handleTablePress(idTable)
                  }}
                  onPressIn={() => idTable === 1 && setIsHovered(true)}
                  onPressOut={() => idTable === 1 && setIsHovered(false)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[4, 5, 6].map(idTable => (
                <TouchableOpacity
                  key={idTable}
                  style={styles.table}
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[7, 8, 9].map(idTable => (
                <TouchableOpacity
                  key={idTable}
                  style={styles.table}
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[10, 11, 12].map(idTable => (
                <TouchableOpacity
                  key={idTable}
                  style={[
                    styles.table,
                    (idTable === 11 || idTable === 12) && styles.tableRight,
                  ]}
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View
                      style={
                        idTable === 12
                          ? styles.selectedBackgroundLarge
                          : styles.selectedBackground
                      }
                    />
                  )}
                  <Image
                    source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={
                      idTable === 12 ? styles.tableImageLarge : styles.tableImage
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {[13, 14].map(idTable => (
                <TouchableOpacity
                  key={idTable}
                  style={[styles.table, idTable === 14 && styles.tableRight]}
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackgroundLarge} />
                  )}
                  <Image
                    source={table.find((item) => item.idTable === idTable.toString()).tableImage}
                    style={styles.tableImageLarge}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {selectedTable && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    width: '100%',
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
    marginLeft: 10,
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
const DATA = [
  {
    id: '1',
    date: 'April 1, 2024',
    time: '9:54 PM',
    seat: '4',
    tableNumber: '1',
  },
  {
    id: '2',
    date: 'April 1, 2024',
    time: '9:54 PM',
    seat: '4',
    tableNumber: '3',
  },
  {
    id: '3',
    date: 'April 1, 2024',
    time: '9:54 PM',
    seat: '4',
    tableNumber: '5',
  },
  {
    id: '4',
    date: 'April 1, 2024',
    time: '9:54 PM',
    seat: '4',
    tableNumber: '7',
  },
];
