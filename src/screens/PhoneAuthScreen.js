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
  TextInput,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import ActiveButton from '../components/LoginComponent/ActiveButton';
import DisableButton from '../components/LoginComponent/DisableButton';
import SingleButtonAllert from '../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../components/GlobalComponent/headerText';
import InfoText from '../components/GlobalComponent/infoText';
//import InputComponent from '../../components/GlobalComponent/inputComponent';

export default function PhoneAuthScreen({navigation,route}) {
  const [checked, onChange] = useState(false);
  const [phone, setPhone] = React.useState('');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const {role}=route.params;

  //  const phoneInput = useRef(null);

  const signInWithPhoneNumber = () => {
    navigation.navigate('OtpVerificationScreen', {
      phone,
      role
    });
  };
  function hideAlert() {
    setAlertModelFlag(false);
  }

  function onCheckmarkPress() {
    onChange(!checked);
  }

  useEffect(() => {console.warn("role",role)});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainTextContainer}>
        <SingleButtonAllert
          visibal={modelFlag}
          onPress={hideAlert}
          text={'Please Enter Valid Number'}
        />
        <HeaderText heading="Enter mobile number to register or login in Scrappy" />
        {/* <InfoText
          text="Use the phone number to register or"
          style={{marginBottom: 1}}
        />
        <InfoText text="login in Scrappy" style={{marginBottom: 5}} /> */}
      </View>

      {/* <PhoneInput
       
          keyboardType="numeric"
          ref={phoneInput}
          defaultValue={phone}
          defaultCode="GB"
          layout="first"
          textInputProps={{placeholderTextColor: '#7D90AA'}}
          placeholder=""
          codeTextStyle={{color: '#092058'}}
          containerStyle={{
            borderRadius: 10,
            height: 55,
            marginTop: 35,
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: '#ffffff',
            alignSelf: 'center',
            width: '85%',
          }}
          autoFocus
          textContainerStyle={{
            borderRadius: 10,
            backgroundColor: '#ffffff',
            marginLeft: -10,
          }}
          textInputStyle={{color: '#7D90AA', height: 55}}
          onChangeText={verificationCode => {
            setPhone(verificationCode);
          }}
        />  */}

      <View style={styles.phoneInputContainer}>
        <View style={styles.flagContainer}>
          <Image style={styles.uk} source={require('../icons/Login/uk.png')} />
          <Image
            style={styles.down}
            source={require('../icons/Login/down1.png')}
          />
          <Text style={styles.code}>+44</Text>
        </View>

        <TextInput
          style={styles.inputContainer}
          placeholder="07513438167"
          placeholderTextColor="#7D90AA"
          keyboardType="numeric"
          value={phone}
          onChangeText={number => {
            setPhone(number.replace(/[^0-9]/g, ''));
          }}
          maxLength={11}
          minLength={10}
        />
      </View>

      {checked && phone.length > 0 ? (
        <ActiveButton
          onpress={() => {
            phone.length === 11 || phone.length === 10
              ? signInWithPhoneNumber()
              : setAlertModelFlag(true);
          }}
        />
      ) : (
        <DisableButton />
      )}

      <View style={styles.checkboxContainer}>
        <Pressable
          style={[styles.checkboxBase, checked && styles.checkboxChecked]}
          onPress={onCheckmarkPress}>
          {checked && (
            <Image
              style={styles.icon}
              source={require('../icons/Login/mark1.png')}
            />
          )}
        </Pressable>

        <View style={styles.checkboxtextContainer}>
          <Text style={styles.termsText}>I have read and agree to</Text>
          <View style={styles.underlineTextContainer}>
            <Text style={styles.underlineterms}>the terms of use </Text>
            <Text style={{...styles.termsText, textDecorationLine: 'none'}}>
              of Scrappy.
            </Text>
          </View>
        </View>
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

  checkboxBase: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#186BFE',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#186BFE',
  },

  icon: {
    width: 10,
    height: 10,
  },

  termsText: {
    color: '#4F6C8D',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },

  underlineterms: {
    color: '#186BFE',
    textDecorationLine: 'underline',
    marginRight: 3,
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },

  underlineTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },

  checkboxtextContainer: {
    marginHorizontal: 10,
  },

  uk: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 10,
  },

  down: {
    width: 10,
    height: 10,
  },

  flagContainer: {
    borderRadius: 10,
    width: '25%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    overflow: 'hidden',
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },

  inputContainer: {
    width: '60%',
    padding: 5,
    color: '#092058',
    borderRadius: 11,
    backgroundColor: '#ffffff',
    height: 50,
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: 'hidden',
  },
  code: {
    fontSize: 15,
    color: '#092058',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});
