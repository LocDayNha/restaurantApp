import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AxiosInstance from '../../util/AxiosInstance';
import {AppContext} from '../../util/AppContext';

const ProfileScreen = props => {
  const {navigation} = props;
  React.useLayoutEffect(() => {
    navigation.setOptions({tabBarVisible: true});
  });

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [newphoneNumber, setPhoneNumber] = useState('');
  const [newgender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [choseImageee, setChoseImageee] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Nam', value: 'Nam'},
    {label: 'Nữ', value: 'Nữ'},
  ]);

  const {idUser, infoUser, setInfoUser} = useContext(AppContext);
  const {name, gender, phoneNumber, image, birth, address} = infoUser;

  const parseDateFromString = dateString => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    setFullName(name);
    setValue(gender);
    setCity(address);
    setPhoneNumber(phoneNumber);
    setProfileImage(image);
    if (birth) {
      const parsedDate = parseDateFromString(birth);
      if (!isNaN(parsedDate)) {
        setDob(parsedDate);
      } else {
        console.warn('Định dạng ngày không hợp lệ:', birth);
      }
    }
  }, [infoUser]);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setChoseImageee({uri: image.path});
        uploadImageToServer(image);
      })
      .catch(error => {
        console.log('Lỗi khi chọn ảnh:', error);
      });
  };

  const selectedImage = () => {
    if (!choseImageee) {
      if (profileImage) {
        return (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        );
      } else {
        return (
          <Image
            source={require('../../image/user.png')}
            style={styles.profileImage}
          />
        );
      }
    } else {
      return (
        <Image source={{uri: choseImageee.uri}} style={styles.profileImage} />
      );
    }
  };

  const getAge = date => {
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

  const formatDate = input => {
    if (!input) return '';
    const date = input instanceof Date ? input : new Date(input);
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateInputs = (field, value) => {
    const newErrors = {...errors};

    switch (field) {
      case 'fullName':
        if (!value || value.split(' ').length < 2) {
          newErrors.fullName = 'Vui lòng nhập cả họ và tên';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'dob':
        if (!value) {
          newErrors.dob = 'Vui lòng chọn ngày sinh';
        } else if (getAge(value) < 18) {
          newErrors.dob = 'Bạn phải trên 18 tuổi';
        } else {
          delete newErrors.dob;
        }
        break;
      case 'city':
        if (!value) {
          newErrors.city = 'Vui lòng nhập thành phố';
        } else {
          delete newErrors.city;
        }
        break;
      case 'phoneNumber':
        if (!value) {
          newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10}$/.test(value)) {
          newErrors.phoneNumber = 'Số điện thoại phải gồm 10 chữ số';
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case 'gender':
        if (!value) {
          newErrors.gender = 'Vui lòng chọn giới tính';
        } else {
          delete newErrors.gender;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (setter, fieldName) => value => {
    setter(value);
    validateInputs(fieldName, value);
  };

  const handleContinue = () => {
    setSubmitted(true);

    validateInputs('fullName', fullName);
    validateInputs('dob', dob);
    validateInputs('city', city);
    validateInputs('phoneNumber', newphoneNumber);
    validateInputs('gender', newgender);

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
    if (!newphoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(newphoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải gồm 10 chữ số';
    }
    if (!newgender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userInfo = {
        fullName,
        dob: formatDate(dob),
        city,
        phoneNumber: newphoneNumber,
        gender: newgender,
      };

      Alert.alert(
        'Thông tin của bạn',
        `Họ và tên: ${userInfo.fullName}\nNgày sinh: ${userInfo.dob}\nThành phố: ${userInfo.city}\nSố điện thoại: ${userInfo.phoneNumber}\nGiới tính: ${userInfo.gender}`,
      );
    } else {
      console.log('Validation errors:', newErrors);
    }
  };

  const handleGenderSelection = newgender => {
    setGender(newgender);
    setSelectedGender(newgender);
    validateInputs('gender', newgender);
  };

  const uploadImageToServer = async image => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: 'profile.jpg',
      });

      const response = await AxiosInstance().post(
        '/user/upload-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 1) {
        return response.data.url;
      } else {
        ToastAndroid.show('Upload thất bại', ToastAndroid.SHORT);
        return null;
      }
    } catch (error) {
      console.log('Lỗi khi upload ảnh:', error);
      return null;
    }
  };

  const updateInforUser = async () => {
    let updateFields = {
      name: fullName,
      birth: dob ? formatDate(dob) : birth,
      phoneNumber: newphoneNumber,
      address: city,
      image: profileImage,
      gender: value,
    };
    if (choseImageee) {
      const url = await uploadImageToServer(choseImageee);
      if (url) {
        updateFields = {...updateFields, image: url};
      }
    }
    try {
      const update = await AxiosInstance().post(
        '/user/profileUpdate/' + idUser,
        updateFields,
      );
      if (update) {
        setInfoUser(update.update);
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Cập nhật thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Lỗi xác minh mã:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View contentContainerStyle={styles.scrollContainer}>
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
            {selectedImage()}
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
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={[
                  styles.inputContainer,
                  errors.dob && styles.inputContainerError,
                  {width: '48%'},
                ]}>
                <TouchableOpacity
                  style={[styles.inputContainer, {top: 5, left: -10}]}
                  onPress={() => setOpen(true)}>
                  <Text style={{padding: 9, color: dob ? '#000' : '#999'}}>
                    {dob ? formatDate(dob) : 'Chọn ngày sinh'}
                  </Text>
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={open}
                date={dob ? new Date(dob) : new Date()}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setDob(date);
                  validateInputs('dob', date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View
                style={{flex: 1, zIndex: 1000, marginTop: -29, marginLeft: 10}}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <DropDownPicker
                    style={{backgroundColor: '#f2f2f2', borderWidth: 0}}
                    open={openn}
                    value={value}
                    items={items}
                    setOpen={setOpenn}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Chọn giới tính'}
                    placeholderStyle={{color: '#999'}}
                    textStyle={{color: value ? '#000' : '#999'}}
                  />
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {errors.dob && (
                <Text style={[styles.errorText, {width: '50%'}]}>
                  {errors.dob}
                </Text>
              )}
            </View>

            <View
              style={[
                styles.inputContainer,
                errors.city && styles.inputContainerError,
              ]}>
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
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#999"
                value={newphoneNumber}
                onChangeText={handleInputChange(setPhoneNumber, 'phoneNumber')}
                keyboardType="numeric"
              />
            </View>
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={updateInforUser}>
            <Text style={styles.buttonText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        </View>
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
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
    opacity: 0.5,
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
    marginBottom: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    top: -30,
    width: '100%',
    height: 50,
  },
  genderOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
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
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  iconnn: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ProfileScreen;
