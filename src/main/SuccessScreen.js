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

const SuccessScreen = ({visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../image/bg_success.png')}
          style={styles.background}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require('../icon/close_icon.png')}
              style={styles.closeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.title}>Thành công</Text>
            <Text style={styles.message}>Bàn của bạn đã được đặt trước</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../image/success_icon.png')}
                style={styles.successImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.note}>
            Lưu ý: Bàn của bạn sau khi đặt chỉ có hiệu lực trong 1h
          </Text>
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
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    marginTop: 60,
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
    position: 'absolute',
    top: -50,
    textAlign: 'center',
    width: '100%',
  },
  message: {
    fontSize: 16,
    color: 'white',
    position: 'absolute',
    top: -20,
    textAlign: 'center',
    width: '100%',
  },
  note: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
});

export default SuccessScreen;
