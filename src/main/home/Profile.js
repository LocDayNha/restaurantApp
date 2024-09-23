import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, TextInput, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';

const ProfileScreen = (props) => {
  const { navigation } = props;
  React.useLayoutEffect(()=>{navigation.setOptions({tabBarVisible: true})});

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(null);
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  // Bắt lỗi trực tiếp 
  useEffect(() => {
    validateInputs();
  }, [fullName, dob, city, phoneNumber, gender]);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setProfileImage({ uri: image.path });
      })
      .catch(error => {
        console.log('Lỗi khi lấy ảnh:', error);
      });
  };

  // Bắt lỗi nếu người dùng < 18+
  const getAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Bắt lỗi cơ bản
  const validateInputs = () => {
    const newErrors = {};

    if (!fullName || fullName.split(' ').length < 2) {
      newErrors.fullName = 'Vui lòng nhập cả họ và tên';
    }

    if (!dob) {
      newErrors.dob = 'Vui lòng chọn ngày sinh';
    } else if (getAge(dob) < 18) {
      newErrors.dob = 'Bạn phải trên 18 tuổi';
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

  const handleInputChange = (setter, fieldName) => (value) => {
    setter(value);
    if (errors[fieldName]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
    }
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

  const handleGenderSelection = (gender) => {
    setGender(gender);
    setSelectedGender(gender);
    if (errors.gender) {
      setErrors((prevErrors) => ({ ...prevErrors, gender: undefined }));
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
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleChoosePhoto}>
            <Image
              source={require('../../icon/pencil.png')}
              style={[styles.icon1, !profileImage && styles.iconOpacity]}
            />
            <View style={styles.overlay} />
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
          <View
            style={[
              styles.inputContainer,
              errors.dob && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/calendar.png')}
              style={styles.icon}
            />
            <TouchableOpacity
              style={[styles.inputContainer, { top: 5, left: -10 }]}
              onPress={() => setOpen(true)}>
              <Text style={{ color: dob ? '#000' : '#999', padding: 10 }}>
                {dob ? dob.toLocaleDateString() : 'Chọn ngày sinh'}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={open}
            date={dob || new Date()}
            mode="date"
            onConfirm={(date) => {
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

          {/* Gender Selection */}
          <View
            style={[
              styles.genderContainer,
              errors.gender && styles.inputContainerError,
            ]}>
            <Image
              source={require('../../icon/gender.png')}
              style={styles.icon}
            />
            <TouchableOpacity
              style={[styles.genderOption, selectedGender === 'Nam' && styles.selectedGender]}
              onPress={() => handleGenderSelection('Nam')}>
              <Image
                source={require('../../icon/male.png')}
                style={styles.genderIcon}
              />
              <Text style={styles.genderText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedGender === 'Nữ' && styles.selectedGender]}
              onPress={() => handleGenderSelection('Nữ')}>
              <Image
                source={require('../../icon/female.png')}
                style={styles.genderIcon}
              />
              <Text style={styles.genderText}>Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, selectedGender === 'Khác' && styles.selectedGender]}
              onPress={() => handleGenderSelection('Khác')}>
              <Image
                source={require('../../icon/other-gender.png')}
                style={styles.genderIcon}
              />
              <Text style={styles.genderText}>Khác</Text>
            </TouchableOpacity>
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Hoàn tất chỉnh sửa</Text>
      </TouchableOpacity>
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
    top: -10,
  },
  overlay: {
    width: 40,
    height: 34,
    position: 'absolute',
    top: -28,
    left: 18,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    width: 25,
    height: 25,
    left: 26,
    bottom: 24,
    zIndex: 1,
  },
  iconOpacity: {
    opacity: 0.5, // Reduced opacity when no image is selected
  },
  form: {
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: -30,
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 7,
    top: -35,
  },
  genderContainer: {
    width: 320,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    top: -30,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    padding: 5,
    left: 15,
  },
  selectedGender: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  genderIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  genderText: {
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    top: 650,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
