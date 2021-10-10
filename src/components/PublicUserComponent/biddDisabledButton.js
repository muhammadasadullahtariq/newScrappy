import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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
        visible={alertFlag}
        onPress={() => setAlertFlag(false)}
        text={alertText}
      />
      <InfoText
        text={props.bid}
        viewStyle={{alignSelf: 'center', marginTop: 20}}
      />
      <View style={{flex: 1}} />
      <TouchableOpacity disabled={true}>
        <View style={[styles.btnContainer, props.style]}>
          <Text style={styles.btnText}>Accept</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', width: '100%', marginHorizontal: 10},
  buttonComponent: {marginRight: 20},
  btnContainer: {
    marginRight: 20,
    width: 90,
    height: 50,
    backgroundColor: '#CADBFB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat',
    borderRadius: 30,
    marginTop: 30,
  },
  btnText: {
    fontSize: 15,
    color: '#ffffff',
  },
});

export default screen;
