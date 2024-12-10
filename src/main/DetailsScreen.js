import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ToastAndroid, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AxiosInstance from '../util/AxiosInstance';
import { AppContext } from '../util/AppContext'

const DetailsScreen = (props) => {
  const { navigation, route } = props
  const { params } = route
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [seat, setSeat] = useState('');
  //get info user
  const { infoUser } = useContext(AppContext)

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //oder table
  const OrderTable = async () => {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const todayFormatted = formatDate(currentDate);

    if (params.dayBooking <= todayFormatted) {
      ToastAndroid.show("Ngày không hợp lệ", ToastAndroid.SHORT);
    } else {
      const data = await AxiosInstance().post("/booking/add",
        {
          user_id: infoUser._id,
          table_id: params.table._id,
          dayBooking: params.dayBooking,
          seat: seat
        }
      );
      if (data.status) {
        ToastAndroid.show("Đặt bàn thành công", ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show("Đặt bàn thất bại", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ with: '80%', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Xác nhận đặt bàn?</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>Nhà Hàng:</Text>
          <Text style={styles.value}>Phoenix Restaurant</Text>
        </View>

        <View style={[styles.infoRow]}>
          <Text style={styles.label}>Ngày:</Text>
          <Text style={styles.value}>{params.dayBooking}</Text>
        </View>

        <View style={[styles.infoRow]}>
          <Text style={styles.label}>Thời gian:</Text>
          <Text style={styles.value}>{params.table.timeline_id.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Bàn số:</Text>
          <Text style={styles.value}>{params.table.number}</Text>
        </View>

        <View style={{
          width: '100%', height: 60, borderRadius: 20, backgroundColor: '#DDDDDD', marginTop: '2%', justifyContent: 'center'
        }}>
          <TextInput onChangeText={setSeat} placeholder="Số người:" style={{ paddingLeft: '5%', color: '#000', fontWeight: 'bold', fontSize: 20 }}></TextInput>
        </View>
      </View>

      <View style={{ borderTopWidth: 1, borderTopColor: '#3D3D3D', marginTop: '5%', height: '44%', marginBottom: '2%' }}>
        <Text style={styles.textDishes}>Món ăn: </Text>
        <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Them mon an ne</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => { OrderTable() }} style={styles.confirmButton}>
        <Text style={styles.confirmText}>Xác nhận đặt bàn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    width: '90%',
    height: '100%'
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontFamily: 'position',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoContainer: {
    marginBottom: 40,
    height: '27%'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#3D3D3D',
  },
  label: {
    color: '#000',
    fontSize: 18,
  },
  value: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  confirmButton: {
    backgroundColor: '#000',
    with: '30%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
  },
  textDishes: {
    fontSize: 22,
    fontFamily: 'position',
    color: '#000',
    fontWeight: 'bold',
    marginTop: '5%',
    height: '10%'
  }
});

export default DetailsScreen;
