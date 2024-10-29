import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Settings,
  LoginManager,
  Profile,
  LoginButton,
} from 'react-native-fbsdk-next';

Settings.setAppID('2033816147055110');

const LoginFacebook = () => {
  const handleLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const profile = await Profile.getCurrentProfile();
        if (profile) {
          console.log(profile);
          // const data = {
          //   name: profile.name,
          //   givenName: profile.firstName,
          //   familyName: profile.lastName,
          //   email: profile.userID,
          //   photoUrl: profile.imageURL,
          // };
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={handleLogin}
        title="Login with Facebook"
      />
      <LoginButton />
    </View>
  );
};

export default LoginFacebook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
