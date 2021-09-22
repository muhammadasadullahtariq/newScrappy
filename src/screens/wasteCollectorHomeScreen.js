import React, {useState, useEffect} from 'react';
import {Button, ScrollView, StyleSheet, View, FlatList} from 'react-native';
import ButtonComponent from '../components/WasteCollector/buttonComponent';
import FlatListItemView from '../components/WasteCollector/listComponent';
import getWasteData from '../Functions/wasteCollector/wasteCollectorData';
import sellSrap from '../icons/WasteCollerTabScreen/sellScrap.png';
import WaitingComponent from '../components/GlobalComponent/waitingAlertComponent';
import {useIsFocused} from '@react-navigation/native';

const screen = () => {
  const isFocused = useIsFocused();
  const [topButtonArray, setTopButtonArray] = useState([
    {name: 'Metal', flag: false},
    {name: 'Paper', flag: false},
    {name: 'Plastic', flag: false},
    {name: 'Mixed', flag: false},
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
    if (isFocused) getUserWasteData();
  }, [isFocused]);

  async function filterArray(title) {
    setWaitingAlertFlag(true);
    setUserFlag(title);
    const data = await getWasteData(global.id, title + ' Scrap');
    console.log('data', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  async function getUserWasteData() {
    const data = await getWasteData(global.id);
    console.log('data', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <WaitingComponent visible={waitingAlertFlag} />
      <ScrollView
        contentContainerStyle={styles.topButtonContainer}
        horizontal={true}>
        {topButtonArray.map(item => {
          return (
            <ButtonComponent
              key={item.name}
              text={item.name}
              onPress={() => filterArray(item.name)}
              flag={item.flag}
            />
          );
        })}
      </ScrollView>
      <View style={{width: '100%', height: 20}} />
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
            timeLeft={items.item.timeLeft.substring(0, 10)}
            userId={global.id}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  topButtonContainer: {flexDirection: 'row', height: 60},
  buttonContainer: {
    width: 100,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default screen;
