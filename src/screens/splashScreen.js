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
import checkUserExist from "../Functions/Login/userExistInDataBaseOrNot"


const screen = ({navigation, route}) => {
  let userFlag=false;
  const [screenTime, setScreenTime] = useState(3);
  let interval;
  async function getUserDetail()
  {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("here am i");
    try{
      let resultUserExist = await checkUserExist(user.phoneNumber);
      console.log(resultUserExist);
if (resultUserExist == 'User not found') {
userFlag=false;
} else {
global.id = resultUserExist.data._id;
userFlag=true;

}
}catch(err){console.log(err)}
      }
      else{userFlag=false}
    })
  }


  function timerForotp() {
    interval = setInterval(() => {
      setScreenTime(s => {
        if (s == 1) {
          clearInterval(interval);
          console.error(userFlag)
          if (userFlag) {
              
            navigation.reset;
navigation.reset({
index: 0, //the stack index
routes: [
  {
    name: 'WasteCollectorHomeScreen',
  }, //to go to initial stack screen
],
});
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'PhoneAuthScreen'}],
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
