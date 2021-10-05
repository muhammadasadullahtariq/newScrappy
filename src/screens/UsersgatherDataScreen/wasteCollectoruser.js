import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import InputComponent from '../../components/GlobalComponent/inputComponentWithTag';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import postCodeListDownload from '../../Functions/UserRegistration/fetchPostCode';
import {registerWasteCollector} from '../../Functions/Global/postRequest';
import auth from '@react-native-firebase/auth';
import {
  checkPostalCode,
  validateEmail,
} from '../../Functions/UserRegistration/codeAndEmailValidation';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import processPostCode from '../../Functions/Global/postCodeProcess';
import MultiSelect from 'react-native-multiple-select';

const screen = ({navigation, route}) => {
  const multiSelect = useRef(null);
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
  const [postCodeList, setPostCodeList] = useState([]);

  function firsNameHandler(text) {
    setFirstName(
      text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
    );
  }
  function lastNameHandler(text) {
    setLastName(
      text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
    );
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
  const onSelectedItemsChange = selectedItems => {
    setPostCodeArray(selectedItems);
    //this.setState({selectedItems});
  };

  async function getPostCodeList() {
    var data = await postCodeListDownload();
    console.log(data);
    setPostCodeList(data);
  }

  useEffect(() => {
    console.log('ws', phone);
    getPostCodeList();
  }, [flag]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.mainContainer}>
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
          <View style={{marginHorizontal: 20}}>
            {console.log(postCodeArray)}
            {multiSelect.current &&
              multiSelect.current.getSelectedItemsExt &&
              multiSelect.current.getSelectedItemsExt(postCodeArray)}
          </View>
          <View
            style={{
              width: '80%',
              height: 200,
              alignSelf: 'center',
            }}>
            <InfoText
              text={'Post codes you serve'}
              style={{
                paddingHorizontal: 10,
                paddingLeft: 5,
                marginVertical: 10,
              }}
            />
            <MultiSelect
              styleSelectorContainer={[
                styles.multiSelectContainer,
                {height: '100%'},
              ]}
              styleItemsContainer={[
                styles.multiSelectContainer,
                {
                  width: '100%',
                  height: '100%',

                  marginBottom: -45,
                },
              ]}
              styleDropdownMenu={[
                styles.multiSelectContainer,
                {
                  height: '60%',
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: servicePostCodeFlag ? 'red' : '#ffffff',
                },
              ]}
              hideTags
              items={postCodeList}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={postCodeArray}
              selectText="Post codes you serve"
              searchInputPlaceholderText="Search post code"
              onChangeInput={text => console.log(text)}
              ref={multiSelect}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#CCC'}}
              submitButtonText=""
              submitButtonColor="#00000000"
              hideSubmitButton={true}
              fixedHeight={true}
              tagContainerStyle={{width: 80, fontFamily: 'Montserrat'}}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <ButtonComponent
            text="Next"
            style={{
              marginBottom: 10,
              width: '70%',
              fontWeight: 'bold',
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
    flex: 1,
  },
  cancelTextContainer: {
    borderColor: '#a1ffba',
    height: 30,
    paddingTop: 5,
    paddingRight: 5,
    color: 'black',
    fontWeight: 'bold',
    width: 13,
    borderRadius: 25,
  },
  textContainer: {
    borderColor: '#a1ffba',
    paddingTop: 5,
    borderRadius: 25,
    height: 30,
    opacity: 0.6,
  },
  multiSelectContainer: {
    width: '80%',
    borderRadius: 11,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    alignSelf: 'center',
    height: '100%',
  },
});

export default screen;
