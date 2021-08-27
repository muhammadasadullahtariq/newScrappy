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

import PhoneInput from 'react-native-phone-number-input';
import ActiveButton from '../components/ActiveButton';
import DisableButton from '../components/DisableButton';

export default function OtpVerificationScreen({navigation, route}) {
  const [code, setCode] = React.useState('');
  const [confirmation, setConfirm] = React.useState();
  const {phone} = route.params;
  const confirmCode = async () => {
    try {
      const result = await confirmation.confirm(code);
      console.log('our result', result);

      navigation.reset({
        index: 0, //the stack index
        routes: [
          {name: 'HomeScreen'}, //to go to initial stack screen
        ],
      });
    } catch (error) {
      // Alert.alert('you have enter incorrect code')
      Alert.alert('Please Enter Valid Code');
    }
  };

  useEffect(() => {
    signInWithPhoneNumber1();
  }, []);

  const signInWithPhoneNumber1 = async () => {
    const confirmation = await auth().signInWithPhoneNumber('+44' + phone);
    setConfirm(confirmation);
    console.log('confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.title}>Verification codes OTP</Text>
        <Text style={{...styles.title, fontSize: 15, marginTop: 15}}>
          A verification codes has been sent{'\n'}
          to{' '}
          <Text
            style={{
              ...styles.title,
              fontSize: 15,
              marginTop: 15,
              color: '#000000',
            }}>
            {' '}
            +44 {phone}
            {/* {JSON.stringify(number)} */}
          </Text>
        </Text>
      </View>

      <View style={styles.otpConatiner}>
        <SmoothPinCodeInput
          codeLength={6}
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
        <Text style={{...styles.otpTimer, opacity: 0.5}}>
          Send Again OTP (59s)
        </Text>
        <Text style={styles.otpTimer}>Change Phone Number</Text>
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
    fontSize: 20,
    color: '#092058',
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
    alignSelf: 'center',
    marginTop: 20,
  },
});
