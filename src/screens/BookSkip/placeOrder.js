import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import InputComponent from '../../components/GlobalComponent/inputComponent';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import BookedSkip from '../../components/bookSkip/bookedSkipComponent';
import ListComponent from '../../components/bookSkip/testComponent';
import TotalBill from '../../components/bookSkip/totalBill';
import totalBillFunction from '../../Functions/bookSkip/calculateTotalbill';
import WaitingAlert from '../../components/GlobalComponent/waitingAlertComponent';
import apiBookSkip from '../../Functions/bookSkip/apiBookSkip';
import Alert from '../../components/GlobalComponent/singleButtonAlert';

const screen = ({navigation, route}) => {
  const {data} = route.params;
  const {date} = route.params;
  const {time} = route.params;

  const [totalBill, setTotalBill] = useState();
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertText, setAlertText] = useState('Skip Booked');

  useEffect(() => {
    calculateTotalBill();
  }, []);

  async function calculateTotalBill() {
    var total = await totalBillFunction(data);
    setTotalBill(total);
  }
  async function placeOrder() {
    setWaitingAlertFlag(true);
    const responce = await apiBookSkip(data, time, Object.keys(date));
    setWaitingAlertFlag(false);
    setAlertFlag(true);
    setAlertText(responce.message);
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <WaitingAlert visible={waitingAlertFlag} />
      <Alert
        visible={alertFlag}
        onPress={() => setAlertFlag(false)}
        text={alertText}
      />
      <BookedSkip data={data} />
      <ListComponent
        name={Object.keys(date)}
        text={time ? '7am-12pm' : '12pm-5pm'}
      />
      <ListComponent name={'Purchase Order'} text={'SKIP1234'} />
      <ListComponent name={'Promo Code'} text={'SKIP123'} />
      <TotalBill name="Sub Total" text={totalBill} />
      <ButtonComponent
        text="Confirm"
        style={{width: '60%', marginTop: 60}}
        onPress={() => {
          placeOrder();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({mainContainer: {}});

export default screen;
