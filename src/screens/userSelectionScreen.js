import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

//import Components
import UserSelectionButtonComponent from '../components/userSelectionComponent/ButtonComponent';
//import InputComponent from '../components/GlobalComponent/inputComponent';
import ButtonComponent from '../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../components/GlobalComponent/singleButtonAlert';
import {useNavigation} from '@react-navigation/native';
import HeaderText from '../components/GlobalComponent/headerText';
import Orientation from 'react-native-orientation';

const screen = ({navigation, route}) => {
  //UseState variable declaration
  const Navigation = useNavigation();
  const [homeUserFlag, setHomeUserFlag] = useState(false);
  const [wasteCollectorFlag, setWastCollectorFlag] = useState(false);
  const [yardFlag, setYardFlag] = useState(false);
  const [wasteBuyerFlag, setWasteBuyerFlage] = useState(false);
  const {phone} = route.params;
  //const phone = 'asad';
  // const [postCodeInputFieldText, setPostCodeInputFiledText] = useState('');
  // const [postCodeArray, setPostCodeArray] = useState([]);
  //const [flag, setFlag] = useState(true);
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [alertText, setAlertText] = useState('Please Enter Valid Code');
  //function that make sure only one user is selected at a time

  function checkValidation() {
    if (!yardFlag && !wasteBuyerFlag && !wasteCollectorFlag && !homeUserFlag) {
      setAlertText('Select A catagory');
      setAlertModelFlag(true);
    } else if (yardFlag) {
      Navigation.navigate('YardUser', {phone});
    } else if (wasteBuyerFlag) {
      Navigation.navigate('WasteBuyer', {phone});
    } else if (wasteCollectorFlag) {
      Navigation.navigate('WasteCollector', {phone});
    } else if (homeUserFlag) {
      Navigation.navigate('HomeUser', {phone});
    }
  }
  function setUserFlag(user) {
    console.log(user);
    if (user == 'homeUser') {
      setHomeUserFlag(true);
    } else {
      setHomeUserFlag(false);
    }
    if (user == 'wasteCollector') {
      setWastCollectorFlag(true);
    } else {
      setWastCollectorFlag(false);
    }
    if (user == 'yard') {
      setYardFlag(true);
    } else {
      setYardFlag(false);
    }
    if (user == 'wasteBuyer') {
      setWasteBuyerFlage(true);
    } else {
      setWasteBuyerFlage(false);
    }
  }
  //Function to check entered postal code is correct or not?
  // function checkPostalCode(code) {
  //   code = code.replace(' ', '');
  //   if (code.length >= 5 && code.length <= 7) {
  //     if (code[code.length - 3] >= 0 && code[code.length - 3] <= 9) {
  //       if (isLetter(code[code.length - 2]) && isLetter(code[code.length - 2]))
  //         return true;
  //       else {
  //         console.log('Character issue');
  //       }
  //     }
  //   } else {
  //     console.log('length issue');
  //   }
  //   return false;
  // }
  //check a character is alphabet or not
  // function isLetter(c) {
  //   return c.toLowerCase() != c.toUpperCase();
  // }

  // function setInputFieldText(text) {
  //   setPostCodeInputFiledText(text);
  // }

  //Function to Hide Alert
  function hideAlert() {
    setAlertModelFlag(false);
  }
  useEffect(() => {
    Orientation.lockToPortrait();
    console.log(phone);
  });

  //FrontEnd
  return (
    <View style={styles.mainContainer}>
      <SingleButtonAllert
        visibal={modelFlag}
        onPress={hideAlert}
        text={alertText}
      />
      <HeaderText
        heading="Please Select Your Category"
        style={{marginTop: '20%'}}
      />
      <UserSelectionButtonComponent
        flag={homeUserFlag}
        onPress={setUserFlag}
        user="homeUser"
        text="Home User"
      />
      <UserSelectionButtonComponent
        flag={wasteCollectorFlag}
        onPress={setUserFlag}
        user="wasteCollector"
        text="Waste Collector"
      />
      {/* {wasteCollectorFlag && (
        <View>
          {postCodeArray.map(item => {
            return (
              <View
                key={item}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={styles.textContainer}>{item}</Text>
                <Pressable
                  style={{width: '5%'}}
                  onPress={() => {
                    console.log(item);
                    let array = postCodeArray;
                    console.log(array.indexOf(item));
                    array.splice(array.indexOf(item), 1);
                    setFlag(!flag);
                    setPostCodeArray(array);
                  }}>
                  <Text style={styles.cancelTextContainer}>X</Text>
                </Pressable>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
            <InputComponent
              placeholderText="Enter Postal Code"
              text={postCodeInputFieldText}
              textHandler={setInputFieldText}
              style={{
                width: '60%',
              }}
              style1={{
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Pressable
              style={{width: '10%'}}
              onPress={() => {
                console.log(postCodeInputFieldText);
                if (checkPostalCode(postCodeInputFieldText)) {
                  setPostCodeArray(s => [...s, postCodeInputFieldText]);
                  setPostCodeInputFiledText('');
                } else {
                  setAlertText('Please Enter Valid Code');
                  setAlertModelFlag(true);
                }
              }}>
              <View style={[{justifyContent: 'center'}, styles.addButtonStyle]}>
                <Text style={{textAlign: 'center', color: 'white'}}>Add</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )} */}
      <UserSelectionButtonComponent
        flag={yardFlag}
        onPress={setUserFlag}
        user="yard"
        text="Yard"
      />
      <UserSelectionButtonComponent
        flag={wasteBuyerFlag}
        onPress={setUserFlag}
        user="wasteBuyer"
        text="Waste Buyer"
      />
      <View style={{flex: 1, flexDirection: 'column'}}></View>
      <ButtonComponent
        text="Next"
        style={{width: '70%', marginBottom: 40}}
        onPress={checkValidation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  textContainer: {
    textAlignVertical: 'center',
    width: '65%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    height: 30,
    borderColor: '#dddd',
  },
  cancelTextContainer: {
    borderColor: '#dddd',
    borderTopWidth: 1,
    borderRightWidth: 1,
    height: 30,
    borderBottomWidth: 1,
    textAlignVertical: 'center',
    paddingRight: 5,
    color: 'red',
  },
  addButtonStyle: {
    color: 'white',
    backgroundColor: '#2097f5',
    height: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  cardContainer: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 5,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        marginTop: 5,
      },
      android: {
        marginTop: 5,
      },
    }),
  },
});

export default screen;
