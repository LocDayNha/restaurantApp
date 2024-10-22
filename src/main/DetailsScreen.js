<<<<<<< HEAD
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useAppContext } from './home/AppContext';
=======
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AxiosInstance from '../util/AxiosInstance';
import {AppContext} from '../util/AppContext'
>>>>>>> main

const DetailsScreen = (props) => {
  const {navigation, route} = props
  const {params} = route
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  //get info user
  const {infoUser} = useContext(AppContext)

<<<<<<< HEAD
const DetailsScreen = ({ navigation, route }) => {
  const { bookingData } = route.params;
  const { addBooking } = useAppContext();

  const handleConfirm = () => {
    navigation.navigate('SuccessScreen', { bookingData });
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
              <Text style={styles.value}>{bookingData.date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{bookingData.time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Seats</Text>
              <Text style={styles.value}>{bookingData.seat}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Table</Text>
              <Text style={styles.value}>{bookingData.tableNumber}</Text>
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
=======
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  //oder table
  const OrderTable = async () => {
    const data = await AxiosInstance().post("/booking/add", 
      {
        user_id: infoUser._id,
        table_id: params.table._id ,
        day: date
      }
    );
    if (data.status == true) {
      ToastAndroid.show("Đặt bàn thành công", ToastAndroid.SHORT);
      navigation.goBack()
    } else {
      ToastAndroid.show("Đặt bàn that bai", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm reservation?</Text>

      <View style={styles.infoContainer}>
        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>Restaurant</Text>
          <Text style={styles.value}>Phoenix Restaurant</Text>
        </View>

        <TouchableOpacity 
          style={[styles.infoRow, styles.withBorder]} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{formatDate(date)}</Text>
>>>>>>> main
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{params.table.timeline_id.name}</Text>
        </View>

        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>No of seats</Text>
          <Text style={styles.value}>{params.table.userNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Table no</Text>
          <Text style={styles.value}>{params.table.number}</Text>
        </View>

      </View>

      <TouchableOpacity onPress={() => {OrderTable()}} style={styles.confirmButton}>
        <Text style={styles.confirmText}>CONFIRM RESERVATION</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    top: -40,
    left: -40,
  },
  infoContainer: {
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#3D3D3D',
  },
  label: {
    color: '#A1A1A1',
    fontSize: 16,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    top: 40,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DetailsScreen;
