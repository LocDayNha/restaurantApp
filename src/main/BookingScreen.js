import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import { useAppContext } from './home/AppContext';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../image/bg_booking.png';

const BookingScreen = ({navigation}) => {
  const { bookingData, addBooking } = useAppContext();
  const [idBooking, setIDBooking] = useState(null);
  const handleNavigation = () => {
    console.log('Navigate to another screen');
  };
  const handleAddBooking = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ChooseTableScreen' }],
    });  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.iconContainerLeft}>
          <TouchableOpacity
            onPress={handleNavigation}
            style={styles.navigationButton}>
            <Image
              source={require('../icon/left_icon.png')}
              style={styles.navigationIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainerRight}>
          <Image
            source={require('../icon/notification_icon.png')}
            style={styles.icon}
          />
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.headerText}>Hello, Arti!</Text>
        <Text style={styles.title}>Your reservations</Text>
        <FlatList
          data={bookingData} // Use the bookingData from AppContext
          renderItem={({ item }) => (
            <ItemBooking
              item={item}
              date={item.date}
              time={item.time}
              seat={item.seat}
              tableNumber={item.tableNumber}
            />
          )}
          keyExtractor={(item) => item.idTable}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBooking}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ItemBooking = ({ item, tableNumber, date, time, seat }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.restaurantName}>
          Paragon Restaurant, Calicut
        </Text>
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => { }}>
          <Image
            source={require('../icon/edit_icon.png')}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tableImageRow}>
        <Image
          source={require('../image/image_booking.png')}
          style={styles.tableImage}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}> {time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Seats</Text>
            <Text style={styles.value}>{seat}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Table</Text>
            <Text style={styles.value}>{tableNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  iconContainerLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
  },
  iconContainerRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  navigationButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationIcon: {
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  restaurantName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e25',
    borderRadius: 50,
  },
  editIcon: {
    width: 25,
    height: 25,
  },
  tableImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  tableImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    color: '#AAAAAA',
    fontSize: 16,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 60,
  },
  addButton: {
    backgroundColor: '#232327',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default BookingScreen;
