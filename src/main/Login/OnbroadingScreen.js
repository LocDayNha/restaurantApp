import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, { useState, useRef } from 'react';
import {globalStyles} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  const handleButtonPress = () => {
    if (index < 2) {
      swiperRef.current.scrollBy(1);
    } else {
      navigation.navigate('Login2');
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        ref={swiperRef}
        style={{}}
        loop={false}
        onIndexChanged={setIndex}
        activeDotColor="#000000"
        paginationStyle={styles.pagination}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../image/food3.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Cung cấp bữa ăn theo nhu cầu ăn uống của bạn
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../image/bg2.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Menu đa dạng, nhiều món ngon tùy bạn chọn
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../image/bg3.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Có thể đặt bàn trước tại nhà. Thử ngay
            </Text>
          </View>
        </View>
      </Swiper>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Bắt đầu nào</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    bottom: 10,
  },
});

export default OnboardingScreen;