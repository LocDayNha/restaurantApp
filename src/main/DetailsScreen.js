import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { table } = route.params;
  const handleConfirm = () => {
    navigation.navigate('SuccessScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm reservation?</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.restaurantName}>Paragon Restaurant, Calicut</Text>
          <TouchableOpacity style={styles.editIconContainer} onPress={() => { }}>
            <Image source={require('../icon/edit_icon.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.tableImageRow}>
          <Image source={require('../image/image_booking.png')} style={styles.tableImage} />
          <View style={styles.detailsContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text>{table.date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{table.time}</Text>

            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Seats</Text>
              <Text>{table.seat}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Table</Text>
              <Text style={styles.value}>{table.tableNumber}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomImageContainer}>
        <Image source={require('../image/image_booking.png')} style={styles.bottomImage} />
      </View>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={handleConfirm}>
          <Text style={styles.nextButtonText}>CONFIRM RESERVATION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151518',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#3C3C41',
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  restaurantName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e25',
    borderRadius: 50,
    padding: 5,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  tableImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  tableImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomImageContainer: {
    alignItems: 'center',
    marginVertical: 80,
  },
  bottomImage: {
    width: 150,
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

export default DetailsScreen;