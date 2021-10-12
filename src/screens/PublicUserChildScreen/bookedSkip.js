import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import bookedSkip from '../../Functions/bookSkip/bookedSkip';
import FlatListItemView from '../../components/PublicUserComponent/MainMenu/bookedSkipItem';
import reverseDate from '../../Functions/Global/dateReverse';

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
    const responce = await bookedSkip(global.id);
    console.log(responce.data.data);
    setOptionArray(responce.data.data);
    setWaitingFlag(false);
  }

  return (
    <View>
      <WaitingAlert visible={waitingFlag} />
      <FlatList
        data={optionArray}
        renderItem={items => (
          <FlatListItemView
            date={reverseDate(items.item.bookingDate.substring(0, 10))}
            from={items.item.fromTime}
            to={items.item.toTime}
            data={items.item.bookSkip}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({mainContainer: {}});

export default screen;
