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
          source={require('../assets/images/bg_success.png')}
          style={styles.background}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require('../assets/icons/close_icon.png')}
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
    width: 24,
    height: 24,
  },
  content: {
    alignItems: 'center',
    position: 'absolute',
    top: '20%',
    width: '80%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  successImage: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  note: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    width: '100%',
  },
});

export default ReservationSuccessScreen;