import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
          <Text style={styles.value}>7:00 AM</Text>
        </View>

        <View style={[styles.infoRow, styles.withBorder]}>
          <Text style={styles.label}>No of seats</Text>
          <Text style={styles.value}>4</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Table no</Text>
          <Text style={styles.value}>6</Text>
        </View>

      </View>

      <TouchableOpacity style={styles.confirmButton}>
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

export default ReservationScreen;
