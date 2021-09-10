import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import auth from '@react-native-firebase/auth';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import ActiveButton from '../components/LoginComponent/ActiveButton';
import DisableButton from '../components/LoginComponent/DisableButton';
import ModalComponent from '../components/GlobalComponent/singleButtonAlert';
import {useNavigation} from '@react-navigation/native';
import WaitingAlert from '../components/GlobalComponent/waitingAlertComponent';
import HeaderText from '../components/GlobalComponent/headerText';
import InfoText from '../components/GlobalComponent/infoText';
import CheckUserExist from '../Functions/Login/userExistInDataBaseOrNot';

export default function OtpVerificationScreen({navigation, route}) {
  const Navigation = useNavigation();
  const [code, setCode] = React.useState('');
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(true); //change this
  const [seconds, setSeconds] = useState('59');
  const [confirmation, setConfirm] = React.useState();
  const [alterModelFlag, setAlterModelFlag] = useState(false);
  const [alterModelFlagWithAction, setAlterModelFlagWithAction] =
    useState(false);
  const [alertText, setAlertText] = useState('Alter Text Here');
  const {phone} = route.params; //just for test
  //const phone = 'asad';
  const [optResendCount, setoptResendCount] = useState(0);
  //const [alterOnpressAction, setAlertOnPressAction] = useState(changeModelFlag);
  let alterOnpressAction = changeModelFlag;
  function changeModelFlag() {
    console.log('change Model Flag');
    setAlterModelFlag(!alterModelFlag);
  }

  function changeModelFlagWithAction() {
    console.log('change Model Flag with Action');
    setAlterModelFlagWithAction(!alterModelFlagWithAction);
    Navigation.navigate('PhoneAuthScreen');
  }
  const confirmCode = async () => {
    try {
      const result = await confirmation.confirm(code);
      console.log('our result', result);
      setWaitingAlertFlag(true);
      const resultUserExist = await CheckUserExist(phone);
      if (resultUserExist == 'User not found') {
        setWaitingAlertFlag(false);
        navigation.reset;
        navigation.reset({
          index: 0, //the stack index
          routes: [
            {name: 'Registration', params: {phone: phone}}, //to go to initial stack screen
          ],
        });
      } else {
        setWaitingAlertFlag(false);
        navigation.reset;
        navigation.reset({
          index: 0, //the stack index
          routes: [
            {name: 'HomeScreen', params: {userData: resultUserExist}}, //to go to initial stack screen
          ],
        });
      }
    } catch (error) {
      console.log(error);
      setAlertText('OTP is not correct Please Enter Valid Code');
      //setAlertOnPressAction(changeModelFlag);
      setAlterModelFlag(true);
    }
  };

  let interval;

  function timerForotp() {
    interval = setInterval(() => {
      setSeconds(s => {
        if (s == 1) {
          clearInterval(interval);
          signInWithPhoneNumber();
        }
        return s - 1;
      });
    }, 1000);
  }

  function sendOtpAgain() {
    signInWithPhoneNumber();
  }

  useEffect(() => {
    console.log(phone);
    signInWithPhoneNumber();
  }, []);

  const signInWithPhoneNumber = async () => {
    setoptResendCount(s => {
      if (s == 3) {
        setAlertText('Some internal issue try again latter');
        //setAlertOnPressAction(changeModelFlagWithAction);
        setAlterModelFlagWithAction(true);
      }
      return s + 1;
    });
    try {
      clearInterval(interval);
    } catch (error) {
    } finally {
      setSeconds('59');
    }
    let confirmation;
    await auth()
      .signInWithPhoneNumber('+92' + phone)
      .then(res => {
        setWaitingAlertFlag(false);
        timerForotp();
        console.log('Responce ', res);
        confirmation = res;
        setConfirm(confirmation);
      })
      .catch(err => {
        setAlertText(
          'Some internal error occure Please try again after some time',
        );
        console.log(err);
        setWaitingAlertFlag(false);
        alterOnpressAction = changeModelFlagWithAction;
        setAlterModelFlagWithAction(true);
        //Navigation.navigate('PhoneAuthScreen');
        console.log('Error' + err);
      }); //Change the code in final output
  };

  return (
    <SafeAreaView style={styles.container}>
      <WaitingAlert visible={waitingAlertFlag} />
      <ModalComponent
        visibal={alterModelFlag}
        onPress={changeModelFlag}
        text={alertText}></ModalComponent>
      <ModalComponent
        visibal={alterModelFlagWithAction}
        onPress={changeModelFlagWithAction}
        text={alertText}></ModalComponent>
      <View style={styles.mainTextContainer}>
        <HeaderText heading="Verification codes OTP" />
        <Text style={{...styles.title, fontSize: 15, marginTop: 15}}>
          A verification codes has been sent{'\n'}
          to{' '}
          <Text
            style={{
              ...styles.title,
              fontSize: 15,
              marginTop: 15,
              color: '#000000',
              paddingLeft: 1,
            }}>
            {' '}
            +92 {phone}
            {/* {JSON.stringify(number)} */}
          </Text>
        </Text>
      </View>

      <View style={styles.otpConatiner}>
        <SmoothPinCodeInput
          codeLength={7}
          textStyle={{
            fontSize: 15,
            color: '#092058',
            marginTop: 20,
          }}
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: '#092058',
            width: 12,
            marginRight: 6,
          }}
          restrictToNumbers
          autoFocus
          cellStyleFocused={{
            borderBottomWidth: 0,
          }}
          textStyleFocused={{borderBottomWidth: 0, color: 'red'}}
          containerStyle={{alignSelf: 'center', paddingBottom: 25}}
          value={code}
          onTextChange={code => setCode(code)}
          onBackspace={() => console.log('No more back.')}
        />
      </View>

      {code.length === 6 ? (
        <ActiveButton onpress={() => confirmCode()} />
      ) : (
        <DisableButton />
      )}

      <View>
        <Pressable onpress={sendOtpAgain}>
          <Text style={{...styles.otpTimer, opacity: 0.5}}>
            Send Again OTP ({seconds}s)
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Navigation.navigate('PhoneAuthScreen');
          }}>
          <Text style={styles.otpTimer}>Change Phone Number</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 15,
    color: '#4F6C8D',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },

  mainTextContainer: {
    marginTop: HEIGHT / 6,
  },

  otpConatiner: {
    width: '85%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 20,
  },
  otpTimer: {
    fontSize: 15,
    color: '#0079FE',
    fontFamily: 'Montserrat',
    alignSelf: 'center',
    marginTop: 20,
  },
});
