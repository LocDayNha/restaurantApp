import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const RatingScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [media, setMedia] = useState(null);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={[styles.star, rating >= i ? styles.selectedStar : styles.unselectedStar]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmitRating = () => {
    if (rating === 0 && !comment && !media) {
      Alert.alert("Thông báo", "Vui lòng chọn mức đánh giá ,nhập chú thích và chọn hình ảnh trước khi gửi trước khi gửi.");
    } else if (rating === 0 && !comment) {
      Alert.alert("Thông báo", "Vui lòng chọn mức đánh giá và nhập chú thích trước khi gửi.");
    } else if (rating === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn mức đánh giá trước khi gửi.");
    } else if (!comment && !media) {
      Alert.alert("Thông báo", "Vui lòng viết chú thích và chọn hình ảnh trước khi gửi.");
    } else if (!comment) {
      Alert.alert("Thông báo", "Vui lòng viết chú thích trước khi gửi.");
    } else if (!media) {
      Alert.alert("Thông báo", "Vui lòng chọn hình ảnh hoặc video trước khi gửi.");
    } else {
      Alert.alert("Cảm ơn bạn đã đóng góp ý kiến!");
      setComment('');
      setMedia(null);
      setRating(0);
    }
  };
  

  const getRatingDescription = () => {
    switch (rating) {
      case 1:
        return "Rất tệ";
      case 2:
        return "Tệ";
      case 3:
        return "Chưa hài lòng";
      case 4:
        return "Hài lòng";
      case 5:
        return "Tuyệt vời";
      default:
        return "Vui lòng chọn đánh giá";
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn("Lỗi khi yêu cầu quyền camera:", err);
        return false;
      }
    }
    return true; 
  };
  

  const chooseImage = async () => {
    const cameraPermission = await requestCameraPermission();
    if (!cameraPermission) return;

    Alert.alert(
      "Chọn hình ảnh",
      "Chọn từ thư viện hoặc chụp ảnh mới",
      [
        {
          text: "Chụp hình",
          onPress: () => launchCamera({ mediaType: 'photo', quality: 1 }, handleMediaResponse),
        },
        {
          text: "Thư viện",
          onPress: () => launchImageLibrary({ mediaType: 'photo', quality: 1 }, handleMediaResponse),
        },
        {
          text: "Hủy",
          style: "cancel"
        }
      ]
    );
  };

  const handleMediaResponse = (response) => {
    if (response.didCancel) {
      console.log('Người dùng đã hủy.');
    } else if (response.error) {
      console.log('Lỗi: ', response.error);
    } else {
      setMedia(response.assets[0]);
      console.log('Đã chọn phương tiện:', selectedMedia);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh giá nhà hàng</Text>
      <View style={styles.starContainer}>{renderStars()}</View>
      <Text style={styles.descriptionText}>{getRatingDescription()}</Text>

      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity style={styles.mediaButton} onPress={chooseImage}>
          <Image 
            source={require('../../icon/photo.png')} 
            style={styles.icon}
          />
          <Text style={styles.mediaButtonText}>Thêm ảnh</Text>
        </TouchableOpacity>
      </View>

      {media && (
        <View style={styles.mediaPreview}>
          {media.type.startsWith('image/') ? (
            <Image source={{ uri: media.uri }} style={styles.mediaImage} />
          ) : (
            <Text style={styles.mediaText}>Video đã chọn:{media.uri}</Text>
          )}
        </View>
      )}

      <TextInput
        style={styles.commentInput}
        placeholder="Nhập chú thích cho đánh giá của bạn..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRating}>
        <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 36,
    marginHorizontal: 3,
  },
  selectedStar: {
    color: '#FFD700',
  },
  unselectedStar: {
    color: '#ccc',
  },
  descriptionText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 15,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  mediaButtonText: {
    color: '#333',
    fontSize: 16,
  },
  mediaPreview: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  mediaImage: {
    width: 300,
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
  mediaText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  commentInput: {
    backgroundColor: '#f9f9f9',
    height: 120,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingScreen;
