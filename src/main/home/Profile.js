import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const ProfileScreen = props => {
  const {navigation} = props;

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setProfileImage({uri: image.path});
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!fullName || fullName.split(' ').length < 2) {
      newErrors.fullName = 'Vui lòng nhập cả họ và tên';
    }

    if (!dob) {
      newErrors.dob = 'Vui lòng chọn ngày sinh';
    }

    if (!city) {
      newErrors.city = 'Vui lòng nhập thành phố';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải gồm 10 chữ số';
    }

    if (!gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateInputs()) {
      const userInfo = {
        fullName,
        dob: dob.toLocaleDateString(),
        city,
        phoneNumber,
        gender,
      };

      console.log('User information:', userInfo);

      Alert.alert(
        'Thông tin của bạn',
        `Họ và tên: ${userInfo.fullName}\nNgày sinh: ${userInfo.dob}\nThành phố: ${userInfo.city}\nSố điện thoại: ${userInfo.phoneNumber}\nGiới tính: ${userInfo.gender}`,
      );
    } else {
      console.log('Validation errors:', errors);
    }
  };

  const handleInputChange = (setter, fieldName) => value => {
    setter(value);
    if (errors[fieldName]) {
      setErrors(prevErrors => ({...prevErrors, [fieldName]: undefined}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../icon/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={profileImage} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../../image/food.jpg')}
              style={styles.profileImage}
            />
          )}
          <TouchableOpacity style={styles.icon1} onPress={handleChoosePhoto}>
            <Image
              source={require('../../icon/pencil.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View
            style={[
              styles.inputContainer,
              errors.fullName && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/user.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={handleInputChange(setFullName, 'fullName')}
            />
          </View>
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.datePickerContainer}>
            <Image
              source={require('../../icon/calendar.png')}
              style={styles.icon}
            />
            <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={dob}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDob(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          <View
            style={[
              styles.inputContainer,
              errors.city && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/location.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Thành phố"
              placeholderTextColor="#999"
              value={city}
              onChangeText={handleInputChange(setCity, 'city')}
            />
          </View>
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

          <View
            style={[
              styles.inputContainer,
              errors.phoneNumber && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/phone-call.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={handleInputChange(setPhoneNumber, 'phoneNumber')}
              keyboardType="numeric"
            />
          </View>
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}

          <View
            style={[
              styles.inputContainer,
              errors.gender && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/gender.png')}
              style={styles.icon}
            />
            <Picker
              selectedValue={gender}
              style={{flex: 1}}
              onValueChange={itemValue => {
                setGender(itemValue);
                if (errors.gender) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    gender: undefined,
                  }));
                }
              }}>
              <Picker.Item label="Chọn giới tính" value="" />
              <Picker.Item label="Nam" value="Nam" />
              <Picker.Item label="Nữ" value="Nữ" />
              <Picker.Item label="Khác" value="Khác" />
            </Picker>
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  icon1: {
    width: 35,
    height: 30,
    top: 75,
    right: 115,
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 6,
    borderColor: 'black',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 1,
  },
  form: {
    marginTop: 40,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
  },
  inputContainerError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 45,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
});

export default ProfileScreen;
