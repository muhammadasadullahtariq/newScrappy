import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView,KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import InputComponent from '../../components/GlobalComponent/inputComponentWithTag';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import Orientation from 'react-native-orientation';
import {registerUser} from '../../Functions/Global/postRequest';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import processPostCode from '../../Functions/Global/postCodeProcess';
import {
  checkPostalCode,
  validateEmail,
} from '../../Functions/UserRegistration/codeAndEmailValidation';
const screen = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameFlag, setFirstNameFlag] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameFlag, setLastNameFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFlag, setEmailFlag] = useState(false);
  const [postCode, setPostCode] = useState('');
  const [postCodeFlag, setPostCodeFlag] = useState(false);
  const [alertText, setAlertText] = useState('Please Enter Valid Code');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const {phone} = route.params;
  const {role} = route.params;
  // const role = 1;
  // const phone = 'asad';
  const [alertModelWithAction, setAlertModelWithAction] = useState(false);
  const [alertModelAction, setAlertModelAction] = useState(false);

  function firsNameHandler(text) {
    //const regex = '/^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$/;';
    setFirstName(text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
  }
  function lastNameHandler(text) {
    setLastName(text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
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
    if (!alertModelAction) {
      navigation.reset;
      navigation.reset({
        index: 0, //the stack index
        routes: [
          {name: 'WasteCollectorHomeScreen'}, //to go to initial stack screen
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
    var valueFlag = false;
    if (firstName == '') {
      // setAlertText('Please Enter First Name');
      // setAlertModelFlag(true);
      valueFlag = true;
      setFirstNameFlag(true);
      //return;
    } else {
      setFirstNameFlag(false);
    }
    if (lastName == '') {
      setLastNameFlag(true);
      //return;
    } else {
      setLastNameFlag(false);
    }
    if (email == '') {
      valueFlag = true;
      setEmailFlag(true);
    } else {
      setEmailFlag(false);
    }
    if (postCode == '' || valueFlag) {
      setPostCodeFlag(true);
      setAlertText('Please enter all value');
      setAlertModelFlag(true);
      return;
    } else {
      setPostCodeFlag(false);
    }
    if (validateEmail(email));
    else {
      setAlertText('Please enter Valid Email');
      setAlertModelFlag(true);
      return;
    }
    if (checkPostalCode(postCode));
    else {
      setAlertText('Please enter your valid post code');
      setAlertModelFlag(true);
      return;
    }
    var userPostCodeInLowerCase = processPostCode(postCode);
    setWaitingAlertFlag(true); //User successfully register
    const responce = await registerUser(
      phone, //need to change
      email,
      userPostCodeInLowerCase,
      firstName,
      lastName,
      role,
    );
    if (responce.message === 'User successfully register') {
      global.id = responce.data._id;
      setWaitingAlertFlag(false);
      setAlertText(responce.message);
      //setFlag(false);
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
  useEffect(() => {
    console.log(global.id);
    Orientation.lockToPortrait();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <KeyboardAvoidingView behavior="padding"  enabled style={{flex:1}}> 
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
          tag="First Name"
          placeHolder="First Name"
          flag={firstNameFlag}
          text={firstName}
          textHandler={firsNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          tag="Last Name"
          flag={lastNameFlag}
          placeHolder="Last Name"
          text={lastName}
          textHandler={lastNameHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          tag="Email ID"
          flag={emailFlag}
          placeHolder="Email ID"
          text={email}
          textHandler={emailHandler}
          style={{marginBottom: 10}}
        />
        <InputComponent
          tag="Your post code"
          flag={postCodeFlag}
          placeHolder="Your post code"
          text={postCode}
          textHandler={postCodeHandler}
          style={{marginBottom: 10}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <ButtonComponent
          text="Next"
          style={{
            marginBottom: 30,
            width: '70%',
            fontWeight: 'bold',
            marginTop: 20,
          }}
          onPress={userValidate}
        />
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    
  },
});

export default screen;
