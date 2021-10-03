import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

//import Components
import UserSelectionButtonComponent from '../components/userSelectionComponent/ButtonComponent';
import ButtonComponent from '../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../components/GlobalComponent/singleButtonAlert';
import {useNavigation} from '@react-navigation/native';
import HeaderText from '../components/GlobalComponent/headerText';
import Orientation from 'react-native-orientation';
import auth from '@react-native-firebase/auth';
import TwoButtonAlert from '../components/GlobalComponent/twoButtonAlert';

const screen = ({navigation, route}) => {
  const Navigation = useNavigation();
  const [homeUserFlag, setHomeUserFlag] = useState(false);
  const [wasteCollectorFlag, setWastCollectorFlag] = useState(false);
  const [yardFlag, setYardFlag] = useState(false);
  const [wasteBuyerFlag, setWasteBuyerFlage] = useState(false);
  //const {phone} = route.params;
  const phone = 'asad';
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [confrmAlertFlag, setConfrmAlertFlag] = useState(false);
  const [alertText, setAlertText] = useState('Please Enter Valid Code');

  function checkValidation() {
    if (!yardFlag && !wasteBuyerFlag && !wasteCollectorFlag && !homeUserFlag) {
      setAlertText('Select A catagory');
      setAlertModelFlag(true);
    } else if (yardFlag) {
      Navigation.navigate('HomeUser', {phone: phone, role: 4});
    } else if (wasteBuyerFlag) {
      Navigation.navigate('HomeUser', {phone: phone, role: 3});
    } else if (wasteCollectorFlag) {
      Navigation.navigate('WasteCollector', {phone: phone, role: 2});
    } else if (homeUserFlag) {
      Navigation.navigate('HomeUser', {phone: phone, role: 1});
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
  function hideAlert() {
    setAlertModelFlag(false);
  }
  useEffect(() => {
    Orientation.lockToPortrait();
    console.log(phone);
    auth().onAuthStateChanged(user => {
      console.log(user.phoneNumber);
    });
  });

  //FrontEnd
  return (
    <View style={styles.mainContainer}>
      <SingleButtonAllert
        visibal={modelFlag}
        onPress={hideAlert}
        text={alertText}
      />
      <TwoButtonAlert
        visibal={confrmAlertFlag}
        CancleOnPress={() => setConfrmAlertFlag(false)}
        okOnPress={() => {
          setConfrmAlertFlag(false);
          navigation.reset;
          navigation.reset({
            index: 0, //the stack index
            routes: [
              {name: 'PhoneAuthScreen'}, //to go to initial stack screen
            ],
          });
        }}
        onPress={hideAlert}
        text={'Are you sure you want to cancle registration'}
      />
      <HeaderText
        heading="I am"
        style={{marginTop: '20%'}}
        viewStyle={{
          alignSelf: 'flex-start',
          marginLeft: '10%',
          marginBottom: 20,
        }}
      />
      <UserSelectionButtonComponent
        flag={homeUserFlag}
        onPress={setUserFlag}
        user="homeUser"
        text="Home user"
      />
      <UserSelectionButtonComponent
        flag={wasteCollectorFlag}
        onPress={setUserFlag}
        user="wasteCollector"
        text="Waste collector"
      />

      <UserSelectionButtonComponent
        flag={yardFlag}
        onPress={setUserFlag}
        user="yard"
        text="Yard / Recycling Plant"
      />
      <UserSelectionButtonComponent
        flag={wasteBuyerFlag}
        onPress={setUserFlag}
        user="wasteBuyer"
        text="Trader / Bulk Buyer"
      />
      <View style={{flex: 1, flexDirection: 'column'}}></View>
      <ButtonComponent
        text="Next"
        style={{width: '70%', marginBottom: 20, fontWeight: 'bold'}}
        onPress={checkValidation}
      />
      <ButtonComponent
        text="Cancle"
        onPress={() => {}}
        style={{
          width: '70%',
          marginBottom: 40,
          fontWeight: 'bold',
          backgroundColor: 'red',
        }}
        onPress={() => setConfrmAlertFlag(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#F7F8FA'},
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
