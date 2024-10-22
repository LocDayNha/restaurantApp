<<<<<<< HEAD
import React, { useState, useContext } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> main
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
<<<<<<< HEAD
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
=======

// Import images
const tableImages = {
  1: require('..//tables/chair_1.png'),
  2: require('..//tables/chair_2.png'),
  3: require('..//tables/chair_3.png'),
  4: require('..//tables/chair_4.png'),
  5: require('..//tables/chair_5.png'),
  6: require('..//tables/chair_6.png'),
  7: require('..//tables/chair_7.png'),
  8: require('..//tables/chair_8.png'),
  9: require('..//tables/chair_9.png'),
  10: require('..//tables/chair_10.png'),
  11: require('..//tables/chair_11.png'),
  12: require('..//tables/chair_12.png'),
  13: require('..//tables/chair_13.png'),
  14: require('..//tables/chair_14.png'),
};

const { width, height } = Dimensions.get('window');

const ChooseTableScreen = (props) => {

  const {navigation} = props

  const [selectedTable, setSelectedTable] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  //truyền number qua BookingScreen
  const [number, setNumber] = useState(null)

  const handleTablePress = (id) => {
    setSelectedTable(id); // Chọn bàn
>>>>>>> main
  };

  const handleOutsidePress = () => {
    setSelectedTable(null); // Bỏ chọn khi bấm bên ngoài
  };
<<<<<<< HEAD
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

=======
>>>>>>> main

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}  >
          <View style={styles.tableContainer}>
            {/* Hiển thị các bàn */}
            <View style={styles.row}>
<<<<<<< HEAD
              {[1, 2, 3].map((idTable) => (
=======
              {[1, 2, 3].map((id) => (
>>>>>>> main
                <TouchableOpacity
                  key={idTable}
                  style={[
                    styles.table,
                    idTable === 1 && isHovered && styles.hoveredTable,
                  ]}
<<<<<<< HEAD
                  onPress={() => {
                    handleTablePress(idTable)
                  }}
                  onPressIn={() => idTable === 1 && setIsHovered(true)}
                  onPressOut={() => idTable === 1 && setIsHovered(false)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
=======
                  onPress={() => {handleTablePress(id), setNumber(id)}}
                  onPressIn={() => id === 1 && setIsHovered(true)}
                  onPressOut={() => id === 1 && setIsHovered(false)}
                >
                  {selectedTable === id && <View style={styles.selectedBackground} />}
                  <Image source={tableImages[id]} style={styles.tableImage} />
>>>>>>> main
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
<<<<<<< HEAD
              {[4, 5, 6].map(idTable => (
=======
              {[4, 5, 6].map((id) => (
>>>>>>> main
                <TouchableOpacity
                  key={idTable}
                  style={styles.table}
<<<<<<< HEAD
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
=======
                  onPress={() => {handleTablePress(id), setNumber(id)}}
                >
                  {selectedTable === id && <View style={styles.selectedBackground} />}
                  <Image source={tableImages[id]} style={styles.tableImage} />
>>>>>>> main
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
<<<<<<< HEAD
              {[7, 8, 9].map(idTable => (
=======
              {[7, 8, 9].map((id) => (
>>>>>>> main
                <TouchableOpacity
                  key={idTable}
                  style={styles.table}
<<<<<<< HEAD
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
                    <View style={styles.selectedBackground} />
                  )}
                  <Image source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={styles.tableImage} />
=======
                  onPress={() => {handleTablePress(id), setNumber(id)}}
                >
                  {selectedTable === id && <View style={styles.selectedBackground} />}
                  <Image source={tableImages[id]} style={styles.tableImage} />
>>>>>>> main
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
<<<<<<< HEAD
              {[10, 11, 12].map(idTable => (
=======
              {[10, 11, 12].map((id) => (
>>>>>>> main
                <TouchableOpacity
                  key={idTable}
                  style={[
                    styles.table,
                    (idTable === 11 || idTable === 12) && styles.tableRight,
                  ]}
<<<<<<< HEAD
                  onPress={() => handleTablePress(idTable)}>
                  {selectedTable === idTable && (
=======
                  onPress={() => {handleTablePress(id), setNumber(id)}}
                >
                  {selectedTable === id && (
>>>>>>> main
                    <View
                      style={
                        idTable === 12
                          ? styles.selectedBackgroundLarge
                          : styles.selectedBackground
                      }
                    />
                  )}
                  <Image
<<<<<<< HEAD
                    source={table.find((item) => item.idTable === idTable.toString()).tableImage} style={
                      idTable === 12 ? styles.tableImageLarge : styles.tableImage
                    }
=======
                    source={tableImages[id]}
                    style={id === 12 ? styles.tableImageLarge : styles.tableImage}
>>>>>>> main
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
<<<<<<< HEAD
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
=======
              {[13, 14].map((id) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.table, id === 14 && styles.tableRight]}
                  onPress={() => {handleTablePress(id), setNumber(id)}}
                >
                  {selectedTable === id && <View style={styles.selectedBackgroundLarge} />}
                  <Image source={tableImages[id]} style={styles.tableImageLarge} />
>>>>>>> main
                </TouchableOpacity>
              ))}
            </View>
          </View>
<<<<<<< HEAD
          {selectedTable && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          )}
=======
>>>>>>> main
        </ScrollView>

        {/* Nút NEXT luôn hiển thị ở dưới cùng màn hình */}
        {selectedTable && (
          <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {sendNumber: number})} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
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
    top: 0,
    left: 3,
    right: 3,
    bottom: 0,
    backgroundColor: 'green',//rgba(255, 0, 0, 0.5)
    borderRadius: 10,
    zIndex: -1,
  },
  selectedBackgroundLarge: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    bottom: 0,
    backgroundColor: 'green',//rgba(255, 0, 0, 0.5)
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
    position: 'absolute',
    bottom: 20, 
    left: 20, 
    right: 20, 
    paddingVertical: 15,
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
