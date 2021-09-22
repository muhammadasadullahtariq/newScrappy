import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../GlobalComponent/ButtonComponent';
import InfoText from '../GlobalComponent/infoText';
import Alter from '../../components/GlobalComponent/singleButtonAlert';
import WaitingAlter from '../../components/GlobalComponent/waitingAlertComponent';
import soldWaste from '../../Functions/HomeUserDashBoard/acceptBid';

const screen = props => {
  const [waitingAlterFlag, setWaitingAlertFlag] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertText, setAlertText] = useState('Bid Accepted');

  async function acceptBid() {
    setWaitingAlertFlag(true);
    const data = await soldWaste(props.id);
    setWaitingAlertFlag(false);
    setAlertText(data.message);
    setAlertFlag(true);
  }

  return (
    <View style={styles.mainContainer}>
      <WaitingAlter visible={waitingAlterFlag} />
      <Alter
        visibal={alertFlag}
        onPress={() => setAlertFlag(false)}
        text={alertText}
      />
      <InfoText text={props.bid} viewStyle={{alignSelf: 'center'}} />
      <View style={{flex: 1}} />
      <Button
        text={'Accept'}
        onPress={acceptBid}
        style={styles.buttonComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', width: '100%', marginHorizontal: 10},
  buttonComponent: {marginRight: 20},
});

export default screen;
