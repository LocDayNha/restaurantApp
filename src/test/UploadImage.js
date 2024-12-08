import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCameraLaunch = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Image Picker Error:', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const handleLibraryLaunch = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('Image Picker Error:', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Image</Text>
      <Button title="Take Photo" onPress={handleCameraLaunch} />
      <Button title="Choose from Gallery" onPress={handleLibraryLaunch} />
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
