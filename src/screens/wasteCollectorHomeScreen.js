import React, {useState, useEffect} from 'react';
import {Button, ScrollView, StyleSheet, View, FlatList} from 'react-native';
import ButtonComponent from '../components/WasteCollector/buttonComponent';
import FlatListItemView from '../components/WasteCollector/listComponent';
import getWasteData from '../Functions/wasteCollector/wasteCollectorData';
import sellSrap from '../icons/WasteCollerTabScreen/sellScrap.png';
import WaitingComponent from '../components/GlobalComponent/waitingAlertComponent';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';

const screen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [topButtonArray, setTopButtonArray] = useState([
    {label: 'Metal', flag: false, value: 'Metal'},
    {label: 'Paper', flag: false, value: 'Paper'},
    {label: 'Plactic', flag: false, value: 'Plactic'},
    {label: 'Mixed', flag: false, value: 'Mixed'},
    {label: 'Logout', flag: false, value: 'Logout'},
  ]);
  const [userData, setUserData] = useState([]);
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(true);

  function setUserFlag(user) {
    console.log(user);
    var arr = [...topButtonArray];
    var i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].name == user) {
        arr[i].flag = true;
      } else {
        arr[i].flag = false;
      }
      //arr[i].flag = false;
    }
    if (i == arr.length) {
      setTopButtonArray(arr);
    }
  }

  useEffect(() => {
    //global.id = '614882e461895615992ecf5f';
    if (isFocused) {
      var i;
      for (i = 0; i < topButtonArray.length; i++) {
        if (topButtonArray[i].flag) {
          fecthDataWithArgument(topButtonArray[i].name);
          break;
        }
      }
      if (i == topButtonArray.length) getUserWasteData();
    }
  }, [isFocused]);

  async function filterArray(title) {
    if (title == 'Logout') {
      auth().signOut();
      navigation.navigate('PhoneAuthScreen');
      return;
    }
    setUserFlag(title);
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
    console.warn('data array', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  return (
    <View contentContainerStyle={styles.mainContainer}>
      <WaitingComponent visible={waitingAlertFlag} />
      <RNPickerSelect onValueChange={value => filterArray(value)} />
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
