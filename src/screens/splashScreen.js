// import React, {useState, useEffect} from 'react';
// import {StyleSheet, View} from 'react-native';

// const screen = () => {
//   return <View style={styles.mainContainer}></View>;
// };

// const styles = StyleSheet.create({mainContainer: {}});

// export default screen;

import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import imageSource from '../icons/SplashScreen/scrappy.gif';
import HeaderText from '../components/GlobalComponent/headerText';
import Orientation from 'react-native-orientation';
import checkUserExist from '../Functions/Login/userExistInDataBaseOrNot';

const screen = ({navigation, route}) => {
  let userFlag = false;
  var userDataGetFlag = false;
  let role=-5;
  const [screenTime, setScreenTime] = useState(3);
  let interval;
  async function getUserDetail() {
    console.log('i called');
    try {
      auth().onAuthStateChanged(async user => {
        if (user) {
          console.log('here am i', user.phoneNumber);
          let resultUserExist = await checkUserExist(user.phoneNumber);
          console.log('result:', resultUserExist);
          console.log(resultUserExist);
          if (resultUserExist == 'User not found') {
            userFlag = false;
            role = -5;
          } else {
            global.id = resultUserExist.data._id;
            userFlag = true;
            role = resultUserExist.data.role;
          }
        } else {
          userFlag = false;
        }
      });
    } catch (err) {
      console.warn('error', err);
    }
    userDataGetFlag = true;
  }

  function timerForotp() {
    interval = setInterval(() => {
      setScreenTime(s => {
        if (s == 1) {
          do {} while (!userDataGetFlag);
          clearInterval(interval);
          console.log(userFlag);
          if (userFlag) {
            navigation.reset;
            if (role == 1) {
              navigation.reset({
                index: 0, //the stack index
                routes: [
                  {
                    name: 'PublicUser',
                  }, //Public User Home Screen
                ],
              });
            } else if (role == 2) {
              navigation.reset({
                index: 0, //the stack index
                routes: [
                  {
                    name: 'WasteCollectorHomeScreen',
                  }, //Waste Collector
                ],
              });
            }
          } else {
            //navigation.setParams({role});
            console.warn('role', role);
            navigation.reset({
              index: 0,
              routes: [{name: 'PhoneAuthScreen', params: {role}}],
            });
          }
          //   auth().onAuthStateChanged(user => {
          //     if (user) {
          //       navigation.reset({
          //         index: 0,
          //         routes: [{name: 'HomeScreen'}],
          //       });
          //     } else {
          //       navigation.reset({
          //         index: 0,
          //         routes: [{name: 'PhoneAuthScreen'}],
          //       });
          //     }
          //   });
        }
        return s - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    Orientation.lockToPortrait();
    getUserDetail();
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
