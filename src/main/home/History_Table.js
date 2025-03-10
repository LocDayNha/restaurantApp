import React, { useState, useEffect, useContext } from 'react';
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

import backgroundImage from '../../image/bg_booking.png';
import Item_Booking_Screen from '../../item/Item_Booking_Screen';
import Item_History_Table from '../../item/Item_History_Table'
import AxiosInstance from '../../util/AxiosInstance';
import { AppContext } from '../../util/AppContext';
import { RefreshControl } from 'react-native'

const History_Table = (props) => {
  const { navigation } = props
  const { infoUser } = useContext(AppContext)
  const [refreshing, setRefreshing] = useState(false);

  const RefreshData = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }

  // Lấy API danh sách lịch sử đặt bàn
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await AxiosInstance().get("/booking/getByUser/" + infoUser._id);
      if (data) {
        setDataTable(data.listBooking);
      } else {
        ToastAndroid.show("Lấy dữ liệu thấy bại", ToastAndroid.SHORT);
        console.log("Lay du lieu that bai");
      }
    };
    getData();

    return () => { }
  }, [])

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
              source={require('../../icon/left_icon.png')}
              style={styles.navigationIcon}
            />
          </TouchableOpacity>
        </View>

      </ImageBackground>

      <View style={styles.content}>
        <FlatList
          data={dataTable}
          renderItem={({ item }) => <Item_History_Table data={item}
          />}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={RefreshData}
            />
          }
        />
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
    height: 140,
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
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
});

export default History_Table;
