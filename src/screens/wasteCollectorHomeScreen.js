import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import ButtonComponent from '../components/WasteCollector/buttonComponent';
import FlatListItemView from '../components/WasteCollector/listComponent';
import getWasteData from '../Functions/wasteCollector/wasteCollectorData';
import sellSrap from '../icons/WasteCollerTabScreen/sellScrap.png';
import WaitingComponent from '../components/GlobalComponent/waitingAlertComponent';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SelectDropdown from 'react-native-select-dropdown';
import InfoText from '../components/GlobalComponent/infoText';

const screen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [optionsArray, setOptionsArray] = useState([
    'All',
    'Metal',
    'Paper',
    'Plastic',
    'Mixed',
  ]);
  const [userData, setUserData] = useState([]);
  const [option, setOption] = useState('');
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(true);

  useEffect(() => {
    //global.id = '614882e461895615992ecf5f';
    if (isFocused) {
      if (option == 'All' || option == '') {
        getUserWasteData();
      } else {
        fecthDataWithArgument(option);
      }
    }
  }, [isFocused]);

  async function filterArray(title) {
    console.log(title);
    setOption(title);
    if (title == 'Logout') {
      auth().signOut();
      navigation.navigate('PhoneAuthScreen');
      return;
    }
    if (title == 'All') {
      await getUserWasteData();
      return;
    }
    await fecthDataWithArgument(title);
  }
  async function fecthDataWithArgument(title) {
    setWaitingAlertFlag(true);
    const data = await getWasteData(global.id, title + ' Scrap');
    console.log('data', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  async function getUserWasteData() {
    const data = await getWasteData(global.id);
    console.log('data array', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  return (
    <View style={styles.mainContainer}>
      <WaitingComponent visible={waitingAlertFlag} />
      <SelectDropdown
        data={optionsArray}
        onSelect={(value, inde) => filterArray(value)}
        defaultButtonText={'Select scrap type'}
        renderCustomizedButtonChild={() => {
          return (
            <View style={{flexDirection: 'row'}}>
              <InfoText text="Select Scrap Type" style={{textAlign: 'left'}} />
              <View style={{flex: 1}} />
              <Image
                style={{width: 15, height: 15, marginRight: 10, marginTop: 5}}
                source={require('../icons/Login/down1.png')}
              />
            </View>
          );
        }}
        buttonTextStyle={{
          fontSize: 15,
          color: '#4F6C8D',
          textAlign: 'left',
          fontFamily: 'Montserrat',
          paddingHorizontal: 20,
        }}
        buttonStyle={{
          width: '95%',
          alignSelf: 'center',
          height: 50,
          borderRadius: 11,
          marginVertical: 5,
          backgroundColor: '#ffffffff',
        }}
        dropdownStyle={{
          borderRadius: 11,
          
          backgroundColor: '#FFFFFF',
        }}
        rowStyle={{marginBottom: 0}}
      />
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topButtonArray.map(item => {
          return (
            <ButtonComponent
              key={item.name}
              text={item.name}
              onPress={() => filterArray(item.name)}
              flag={item.flag}
              style={{marginVertical: 5, marginBottom: 15}}
            />
          );
        })}
      </ScrollView> */}
      <FlatList
        data={userData}
        renderItem={items => (
          <FlatListItemView
            text={items.item.name}
            image={sellSrap}
            id={items.item._id}
            date={items.item.date.substring(0, 10)}
            status={items.item.status}
            higestBid={items.item.highestBid}
            bidCount={items.item.biddingCount}
            yourBid={items.item.yourApplyBid}
            winner={items.item.winner}
            timeLeft={items.item.timeLeft.substring(0, 10)}
            userId={global.id}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default screen;
