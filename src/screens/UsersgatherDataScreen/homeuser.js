import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import InputComponent from '../../components/GlobalComponent/inputComponent';
import ButtonComponent from '../../components/GlobalComponent/buttonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import Orientation from 'react-native-orientation';
import {registerUser} from '../../Functions/Global/postRequest';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import {
  checkPostalCode,
  validateEmail,
} from '../../Functions/UserRegistration/codeAndEmailValidation';

const screen = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [postCode, setPostCode] = useState('');
  const [alertText, setAlertText] = useState('Please Enter Valid Code');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const {phone} = route.params;
  const [alertModelWithAction, setAlertModelWithAction] = useState(false);

  function firsNameHandler(text) {
    setFirstName(text);
  }
  function lastNameHandler(text) {
    setLastName(text);
  }
  function emailHandler(text) {
    setEmail(text);
  }
  function postCodeHandler(text) {
    setPostCode(text);
  }

  function hideAlert() {
    setAlertModelFlag(false);
  }

  function hideAlertWithAction() {
    setAlertModelWithAction(false);
    navigation.reset;
    navigation.reset({
      index: 0, //the stack index
      routes: [
        {name: 'HomeScreen', params: {phone: phone}}, //to go to initial stack screen
      ],
    });
  }

  async function userValidate() {
    if (firstName == '') {
      setAlertText('Please Enter First Name');
      setAlertModelFlag(true);
      return;
    }
    if (lastName == '') {
      setAlertText('Please Enter Last Name');
      setAlertModelFlag(true);
      return;
    }
    if (validateEmail(email));
    else {
      setAlertText('Please Enter Valid Email');
      setAlertModelFlag(true);
      return;
    }
    if (checkPostalCode(postCode));
    else {
      setAlertText('Please Enter Valid Code');
      setAlertModelFlag(true);
      return;
    }
    setWaitingAlertFlag(true); //User successfully register
    const responce = await registerUser(
      phone, //need to change
      email,
      postCode,
      firstName,
      lastName,
      1,
    );
    if (responce.message === 'User successfully register') {
      setWaitingAlertFlag(false);
      setAlertText(responce.message);
      setAlertModelWithAction(true);
    } else if (responce.message === 'Phone already exists') {
      auth().signOut();
      setWaitingAlertFlag(false);
      setAlertText(responce.message + 'Try Another Number');
      setAlertModelFlag(true);
      navigation.reset({
        index: 0, //the stack index
        routes: [
          {name: 'PhoneAuthScreen'}, //to go to initial stack screen
        ],
      });
    } else if (responce.message.length < 30) {
      setWaitingAlertFlag(false);
      setAlertText(responce.message);
      setAlertModelFlag(true);
    } else {
      setWaitingAlertFlag(false);
      setAlertText('Something Went Wrong Please Try Again Later');
      setAlertModelFlag(true);
    }
  }
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <SingleButtonAllert
        visibal={modelFlag}
        onPress={hideAlert}
        text={alertText}
      />
      <SingleButtonAllert
        visibal={alertModelWithAction}
        onPress={hideAlertWithAction}
        text={alertText}
      />
      <WaitingAlert visible={waitingAlertFlag} />
      <View style={{flex: 3, justifyContent: 'center'}}>
        <HeaderText heading="Information" />
        <InfoText text="This information is used to authenticate and protect your account better" />
        <InputComponent
          placeHolder="Enter First Name"
          text={firstName}
          textHandler={firsNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Enter Last Name"
          text={lastName}
          textHandler={lastNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Enter Email"
          text={email}
          textHandler={emailHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Enter PostCode"
          text={postCode}
          textHandler={postCodeHandler}
          style={{marginBottom: 10}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ButtonComponent
          text="Next"
          style={{marginBottom: 30, width: '70%'}}
          onPress={userValidate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default screen;
