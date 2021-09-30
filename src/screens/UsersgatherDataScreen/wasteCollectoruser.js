import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import InputComponent from '../../components/GlobalComponent/inputComponentWithTag';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import {registerWasteCollector} from '../../Functions/Global/postRequest';
import auth from '@react-native-firebase/auth';
import {
  checkPostalCode,
  validateEmail,
} from '../../Functions/UserRegistration/codeAndEmailValidation';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import processPostCode from '../../Functions/Global/postCodeProcess';

const screen = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameFlag, setFirstNameFlag] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameFlag, setLastNameFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFlag, setEmailFlag] = useState(false);
  const [postCode, setPostCode] = useState('');
  const [postCodeFlag, setPostCodeFlag] = useState(false);
  const [userPostCode, setUserPostCode] = useState('');
  const [alertText, setAlertText] = useState('Please Enter Valid Code');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [flag, setFlag] = useState(true);
  const [postCodeArray, setPostCodeArray] = useState([]);
  const [servicePostCodeFlag, setServicePostCodeFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const {phone} = route.params;
  //const phone = 'asad';
  const [alertModelWithAction, setAlertModelWithAction] = useState(false);
  const [alertModelAction, setAlertModelAction] = useState(false);

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
  function userPostCodeHandler(text) {
    setUserPostCode(text);
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
          {name: 'WasteCollectorHomeScreen', params: {phone: phone}}, //to go to initial stack screen
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
    if (postCodeArray.length > 0) {
      setServicePostCodeFlag(false);
    } else {
      valueFlag = true;
      setServicePostCodeFlag(true);
    }
    if (userPostCode == '') {
      setPostCodeFlag(true);
      valueFlag = true;
    } else {
      setPostCodeFlag(false);
    }
    if (valueFlag) {
      setAlertText('Please enter all value');
      setAlertModelFlag(true);
      return;
    }
    if (validateEmail(email));
    else {
      setAlertText('Please enter valid email');
      setAlertModelFlag(true);
      return;
    }
    if (checkPostalCode(userPostCode));
    else {
      setAlertText('Please enter your valid post code');
      setAlertModelFlag(true);
      return;
    }

    setWaitingAlertFlag(true);
    var arr = [...postCodeArray];
    var i = 0;
    for (; i < arr.length; i++) {
      arr[i] = processPostCode(arr[i]);
    }
    var userPostCodeInLowerCase = processPostCode(userPostCode);
    if (i == arr.length) {
      const responce = await registerWasteCollector(
        phone, //need to change
        email,
        userPostCodeInLowerCase,
        firstName,
        lastName,
        arr,
      );
      if (responce.message === 'User successfully register') {
        global.id = responce.data._id;
        setWaitingAlertFlag(false);
        setAlertText(responce.message);
        setAlertModelWithAction(true);
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
  }

  useEffect(() => {
    console.log('ws', phone);
  }, [flag]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
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
          text={userPostCode}
          textHandler={userPostCodeHandler}
          style={{marginBottom: 10}}
        />
        <View style={{flexDirection: 'row'}}>
          {postCodeArray.map(item => {
            return (
              <View
                key={item}
                style={{
                  backgroundColor: '#c4c4c4',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginLeft: 1,
                  borderRadius: 2,
                  marginBottom: 10,
                }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    console.log(item);
                    let array = postCodeArray;
                    console.log(array.indexOf(item));
                    array.splice(array.indexOf(item), 1);
                    setFlag(!flag);
                    setPostCodeArray(array);
                  }}>
                  <Text style={styles.textContainer}>{item}</Text>
                  <Text style={styles.cancelTextContainer}>X</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        <InputComponent
          tag="Post codes you serve"
          flag={servicePostCodeFlag}
          placeHolder="Post codes you serve"
          text={postCode}
          textHandler={postCodeHandler}
          style={{marginBottom: 10}}
          onSubmit={() => {
            if (postCodeArray.length > 7) {
              setAlertText('User can only add upto 7 Services Area');
              setAlertModelFlag(true);
            } else {
              if (postCodeArray.indexOf(postCode) != -1) {
                setAlertText('Post Code Already Exist');
                setAlertModelFlag(true);
              } else {
                if (postCode.length > 1 && postCode.length < 6) {
                  setPostCodeArray(s => [...s, postCode]);
                  setPostCode('');
                } else {
                  setAlertText('Please Enter Valid Code');
                  setAlertModelFlag(true);
                }
              }
            }
          }}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  cancelTextContainer: {
    borderColor: '#a1ffba',
    height: 30,
    textAlignVertical: 'center',
    paddingRight: 5,
    color: 'black',
    width: 13,
    borderRadius: 25,
  },
  textContainer: {
    borderColor: '#a1ffba',
    textAlignVertical: 'center',
    borderRadius: 25,
    height: 30,
    opacity: 0.6,
  },
});

export default screen;
