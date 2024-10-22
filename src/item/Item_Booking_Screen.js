import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Item_Booking_Screen = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
          <View style={styles.row}>
            {/* Bạn có thể thêm các thông tin khác ở đây */}
          </View>
          <View style={styles.tableImageRow}>
            <Image
              source={require('../image/image_booking.png')}
              style={styles.tableImage}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.value}>{data.timeline_id.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Seats</Text>
                <Text style={styles.value}>{data.userNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Table</Text>
                <Text style={styles.value}>{data.number}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
  )
}
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

export default Item_Booking_Screen