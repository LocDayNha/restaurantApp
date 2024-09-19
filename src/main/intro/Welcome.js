import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const WelcomeActivity = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../images/bgtheme.jpg')} 
        style={styles.backgroundImage} 
      />

      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Chào mừng đến</Text>
        <Text style={styles.appName}>Phoenix Restaurant</Text>
        <Text style={styles.description}>
          Nơi sẽ thỏa mãn tâm hồn ăn uống của bạn một cách hoàn hảo nhất
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
  },
});

export default WelcomeActivity;
