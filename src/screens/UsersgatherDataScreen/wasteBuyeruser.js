import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import InputComponent from '../../components/GlobalComponent/inputComponent';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import auth from '@react-native-firebase/auth';
import {
  checkPostalCode,
  validateEmail,
} from '../../Functions/UserRegistration/codeAndEmailValidation';
import {registerUser} from '../../Functions/Global/postRequest';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';

const screen = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [postCode, setPostCode] = useState('');
  const [alertText, setAlertText] = useState('Please Enter Name');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const {phone} = route.params;
  const [alertModelWithAction, setAlertModelWithAction] = useState(false);
  const [alertModelAction, setAlertModelAction] = useState(false);

  function firsNameHandler(text) {
    setFirstName(text.replace(/[ X][ X]*[^A-Za-z]/g, ''));
  }
  function lastNameHandler(text) {
    setLastName(text.replace(/[ X][ X]*[^A-Za-z]/g, ''));
  }
  function emailHandler(text) {
    setEmail(text);
  }
  function postCodeHandler(text) {
    //text=text.toUpperCase();
    setPostCode(text);
  }

  function hideAlert() {
    setAlertModelFlag(false);
  }

  function hideAlertWithAction() {
    setAlertModelWithAction(false);
    if (!alertModelAction) {
      navigation.reset;
      navigation.reset({
        index: 0, //the stack index
        routes: [
          {name: 'HomeScreen', params: {phone: phone}}, //to go to initial stack screen
        ],
      });
    } else {
      navigation.reset;
      navigation.reset({
        index: 0, //the stack index
        routes: [
          {name: 'PhoneAuthScreen'}, //to go to initial stack screen
        ],
      });
    }
  }

  async function userValidate() {
    if (firstName == '') {
      setAlertText('Please Enter First Name');
      //console.log('Please Enter First Name');
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
    setWaitingAlertFlag(true);
    const responce = await registerUser(
      phone, //need to change
      email,
      postCode.toUpperCase(),
      firstName,
      lastName,
      3,
    );
    if (responce.message === 'User successfully register') {
      global.id = responce.data._id;
      setWaitingAlertFlag(false);
      //setFlag(false);
      setAlertText(responce.message);
      setAlertModelWithAction(true);
      //setAlertModelAction(false);
    } else if (responce.message === 'Phone already exists') {
      auth().signOut();
      setWaitingAlertFlag(false);
      setAlertText(responce.message + ' Try Another Number');
      setAlertModelWithAction(true);
      setAlertModelAction(true);
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
        <HeaderText heading="About yourself" />
        <InfoText
          text="This information is used to authenticate and protect your account better"
          style={{marginBottom: 30}}
        />
        <InputComponent
          placeHolder="First Name"
          text={firstName}
          textHandler={firsNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Last Name"
          text={lastName}
          textHandler={lastNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Email ID"
          text={email}
          textHandler={emailHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          placeHolder="Your post code"
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
