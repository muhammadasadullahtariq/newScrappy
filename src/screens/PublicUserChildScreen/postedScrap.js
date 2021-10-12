import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import userDashBoard from '../../Functions/HomeUserDashBoard/homeUserData';
import FlatListItemView from '../../components/PublicUserComponent/MainMenu/flatlistItem';
import reverseDate from '../../Functions/Global/dateReverse';
import sellSrap from '../../icons/WasteCollerTabScreen/sellScrap.png';

const screen = () => {
  const isFocused = useIsFocused();
  const [optionArray, setOptionArray] = useState([]);
  const [waitingFlag, setWaitingFlag] = useState(true);

  useEffect(() => {
    if (isFocused) readUserData();
  }, [isFocused]);
  async function readUserData() {
    setWaitingFlag(true);
    console.log('user data called');
    const responce = await userDashBoard(global.id);
    var arr = responce.data.data.total_earn_price;
    console.log(arr);
    // try {
    //   setBalance(arr[0].total);
    // } catch (err) {
    //   setBalance(0);
    // }
    console.log(responce.data.data.user_data);
    setOptionArray(responce.data.data.user_data);
    setWaitingFlag(false);
  }

  return (
    <View>
      <WaitingAlert visible={waitingFlag} />
      <FlatList
        data={optionArray}
        renderItem={items => (
          <FlatListItemView
            text={items.item.name}
            image={sellSrap}
            id={items.item._id}
            date={reverseDate(items.item.date.substring(0, 10))}
            status={items.item.status}
            higestBid={items.item.biddingPrice}
            bidCount={items.item.biddingCount}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({mainContainer: {}});

export default screen;
