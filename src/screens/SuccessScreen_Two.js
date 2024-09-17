import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';

const ReservationSuccessScreen = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/bg_success.png')} // Replace with your background image path
          style={styles.background}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require('../assets/icons/close_icon.png')} // Replace with your close icon image path
              style={styles.closeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.title}>Success</Text>
            <Text style={styles.message}>Your table is reserved</Text>
          </View>
          <Text style={styles.note}>NOTE: Reservation is only for 1 hour</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/images/success_icon.png')}
              style={styles.successImage}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    zIndex: 1,
  },
  closeImage: {
    width: 24, // Adjust the width as needed
    height: 24, // Adjust the height as needed
  },
  content: {
    alignItems: 'center',
    position: 'absolute',
    top: '20%', // Adjust the position as needed
    width: '80%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 50, // Adjust the position as needed
    alignItems: 'center',
  },
  successImage: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5, // Adjust the margin as needed
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20, // Adjust the margin as needed
  },
  note: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: '50%', // Adjust the position as needed
    width: '100%',
  },
});

export default ReservationSuccessScreen;