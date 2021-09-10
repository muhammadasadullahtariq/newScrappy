import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import InputComponent from '../../components/GlobalComponent/inputComponent';
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

const screen = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [postCode, setPostCode] = useState('');
  const [userPostCode, setUserPostCode] = useState('');
  const [alertText, setAlertText] = useState('Please Enter Valid Code');
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [flag, setFlag] = useState(true);
  const [postCodeArray, setPostCodeArray] = useState([]);
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
    if (postCodeArray.length > 0);
    else {
      setAlertText('Please Enter atleast one Code');
      setAlertModelFlag(true);
      return;
    }
    setWaitingAlertFlag(true);
    const responce = await registerWasteCollector(
      phone, //need to change
      email,
      userPostCode,
      firstName,
      lastName,
      postCodeArray,
    );
    if (responce.message === 'User successfully register') {
      setWaitingAlertFlag(false);
      setAlertText(responce.message);
      setAlertModelWithAction(true);
      setAlertModelAction(false);
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
    console.log('ws', phone);
  }, [flag]);

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
          placeHolder="Enter Your PostCode"
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
          placeHolder="Enter Services PostCode"
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
                if (checkPostalCode(postCode)) {
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
  },
});

export default screen;
