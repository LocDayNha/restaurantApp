import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AxiosInstance from '../util/AxiosInstance';
import {AppContext} from '../util/AppContext';

const DetailsScreen = props => {
  const {navigation, route} = props;
  const {params} = route;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  //get info user
  const {infoUser} = useContext(AppContext);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = date => {
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

    if (formatDate(date) <= todayFormatted) {
      ToastAndroid.show('Ngày không hợp lệ', ToastAndroid.SHORT);
    } else {
      const data = await AxiosInstance().post('/booking/add', {
        user_id: infoUser._id,
        table_id: params.table._id,
        dayBooking: formatDate(date),
      });
      if (data.status) {
        ToastAndroid.show('Đặt bàn thành công', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show('Đặt bàn thất bại', ToastAndroid.SHORT);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận đặt bàn?</Text>

      <View style={styles.infoContainer}>
        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>Restaurant</Text>
          <Text style={styles.value}>Phoenix Restaurant</Text>
        </View>

        <TouchableOpacity
          style={[styles.infoRow, styles.withBorder]}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.label}>Ngày</Text>
          <Text style={styles.value}>{formatDate(date)}</Text>
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
          <Text style={styles.label}>Thời gian</Text>
          <Text style={styles.value}>{params.table.timeline_id.name}</Text>
        </View>

        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>Số ghế ngồi</Text>
          <Text style={styles.value}>{params.table.userNumber}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Bàn số</Text>
          <Text style={styles.value}>{params.table.number}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          OrderTable();
        }}
        style={styles.confirmButton}>
        <Text style={styles.confirmText}>Xác nhận đặt bàn</Text>
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
