import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import imageSource from '../icons/SplashScreen/scrappy.gif';
import HeaderText from '../components/GlobalComponent/headerText';
import Orientation from 'react-native-orientation';

const screen = ({navigation, route}) => {
  const [screenTime, setScreenTime] = useState(3);
  let interval;

  function timerForotp() {
    interval = setInterval(() => {
      setScreenTime(s => {
        if (s == 1) {
          clearInterval(interval);
          auth().onAuthStateChanged(user => {
            if (user) {
              navigation.reset({
                index: 0,
                routes: [{name: 'HomeScreen'}],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'PhoneAuthScreen'}],
              });
            }
          });
        }
        return s - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    Orientation.lockToPortrait();
    timerForotp();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image source={imageSource} style={styles.imageContainer} />
      <HeaderText heading="Your recycling friend.." style={{marginTop: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fbfbfb',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {width: '80%', height: 400, aspectRatio: 1},
});

export default screen;
