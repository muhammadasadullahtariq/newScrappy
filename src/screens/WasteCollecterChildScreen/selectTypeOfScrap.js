import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

//import Components
import ScrapTypeSelectionComponent from '../../components/WasteCollectorTabScreen/selectScrapTypeButtonComponent';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import SingleButtonAllert from '../../components/GlobalComponent/singleButtonAlert';
import {useNavigation} from '@react-navigation/native';
import HeaderText from '../../components/GlobalComponent/headerText';
import Orientation from 'react-native-orientation';

const screen = ({navigation, route}) => {
  const Navigation = useNavigation();
  const [metalScrapFlag, setMetalScrapFlag] = useState(false);
  const [paperWasteFlag, setPaperWasteFlag] = useState(false);
  const [plasticFlag, setPlasticFlag] = useState(false);
  const [mixedWasteFlag, setMixedWasteFlage] = useState(false);
  //const phone = 'asad';
  const [modelFlag, setAlertModelFlag] = useState(false);
  const [alertText, setAlertText] = useState('Please Enter Valid Code');

  function checkValidation() {
    if (!plasticFlag && !mixedWasteFlag && !paperWasteFlag && !metalScrapFlag) {
      setAlertText('Select A catagory');
      setAlertModelFlag(true);
    } else if (plasticFlag) {
      console.log('plastic');
      Navigation.navigate('ScrapDataUpload', {catagory: 'Plactic Scrap'});
    } else if (mixedWasteFlag) {
      console.log('mixed');
      Navigation.navigate('ScrapDataUpload', {catagory: 'Mixed Scrap'});
    } else if (paperWasteFlag) {
      console.log('paper');
      Navigation.navigate('ScrapDataUpload', {catagory: 'Paper Scrap'});
    } else if (metalScrapFlag) {
      console.log('metal');
      Navigation.navigate('ScrapDataUpload', {catagory: 'Metal Scrap'});
    }
  }
  function setUserFlag(user) {
    console.log(user);
    if (user == 'metal scrap') {
      setMetalScrapFlag(true);
    } else {
      setMetalScrapFlag(false);
    }
    if (user == 'paper waste') {
      setPaperWasteFlag(true);
    } else {
      setPaperWasteFlag(false);
    }
    if (user == 'plastic waste') {
      setPlasticFlag(true);
    } else {
      setPlasticFlag(false);
    }
    if (user == 'Mixed Scrap') {
      setMixedWasteFlage(true);
    } else {
      setMixedWasteFlage(false);
    }
  }
  function hideAlert() {
    setAlertModelFlag(false);
  }
  useEffect(() => {
    Orientation.lockToPortrait();
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
        style={{marginTop: '20%', marginBottom: 30}}
      />
      <ScrapTypeSelectionComponent
        flag={metalScrapFlag}
        onPress={setUserFlag}
        user="metal scrap"
        text="Metal Scrap"
      />
      <ScrapTypeSelectionComponent
        flag={paperWasteFlag}
        onPress={setUserFlag}
        user="paper waste"
        text="Paper waste"
      />

      <ScrapTypeSelectionComponent
        flag={plasticFlag}
        onPress={setUserFlag}
        user="plastic waste"
        text="Plastic Waste"
      />
      <ScrapTypeSelectionComponent
        flag={mixedWasteFlag}
        onPress={setUserFlag}
        user="Mixed Scrap"
        text="Mixed Scrap"
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
