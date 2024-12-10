import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ToastAndroid
} from 'react-native';

import backgroundImage from '../image/bg_booking.png';
import Item_Booking_Screen from '../item/Item_Booking_Screen';
import AxiosInstance from '../util/AxiosInstance';
import DateTimePicker from '@react-native-community/datetimepicker';

const Table = [
  {
    "id": "111",
    "number": 1,
    "userNumber": 4
  },
  {
    "id": "222",
    "number": 2,
    "userNumber": 4
  },
  {
    "id": "333",
    "number": 3,
    "userNumber": 4
  },
]

const BookingScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const movetoDetail = (item) => {
    navigation.navigate('DetailsScreen', { table: item, dayBooking: formatDate(date) })
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    // console.log(formatDate(currentDate))
    getData(currentDate);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [dataTable, setDataTable] = useState([]);
  const getData = async (currentDate) => {
    const data = await AxiosInstance().post("/table/getByNumber",
      {
        number: params.sendNumber,
        dayBooking: formatDate(currentDate)
      }
    );

    // console.log(data.listFinal);

    if (!data) {
      ToastAndroid.show("Lấy dữ liệu thấy bại", ToastAndroid.SHORT);
      console.log("Lay du lieu that bai")
    } else {
      setDataTable(data.listFinal);
    }
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={styles.backgroundImage}>
        <View style={styles.iconContainerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navigationButton}>
            <Image
              source={require('../icon/left_icon.png')}
              style={styles.navigationIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={{ width: '50%', height: '8%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: '3%' }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.clickDate}>
          {date ?
            <Text style={styles.textDate}>{formatDate(date)}</Text>
            :
            <Text style={styles.textDate}>Chọn ngày</Text>}
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.content}>
        <FlatList
          data={dataTable}
          renderItem={({ item }) => <Item_Booking_Screen
            data={item}
            onPress={() => { movetoDetail(item) }}
          />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
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
    padding: 20,
    height: '60%',
    width: '100%',
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
    top: -50,
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
    color: 'black',
    fontSize: 16,
  },
  value: {
    color: 'black',
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
    marginLeft: 220,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#2c2c2e',
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
  clickDate: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textDate: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'position',

  }

});

export default BookingScreen;
