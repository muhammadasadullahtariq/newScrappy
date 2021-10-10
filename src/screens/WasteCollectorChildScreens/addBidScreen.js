import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import InputComponent from '../../components/GlobalComponent/inputComponent';
import HeaderText from '../../components/GlobalComponent/headerText';
import Button from '../../components/GlobalComponent/ButtonComponent';
import addBid from '../../Functions/wasteCollector/addBid';
import Alter from '../../components/GlobalComponent/singleButtonAlert';
import WaitingAlter from '../../components/GlobalComponent/waitingAlertComponent';
import getScrapDetail from '../../Functions/HomeUserDashBoard/wasteDetail';
import InfoText from '../../components/GlobalComponent/infoText';
import cancelBid from '../../Functions/wasteCollector/cancleBid';

const screen = ({navigation, route}) => {
  const [bidPrice, setBidPrice] = useState('');
  const [waitingAlterFlag, setWaitingAlertFlag] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [time, setTime] = useState([]);
  const [alertText, setAlertText] = useState('Please Enter Valid Bid');
  const [bidPlaceHolder, setBidPlaceHolder] = useState('1234');
  const [scrapDetail, setScrapDetail] = useState({
    _data: {title: '', description: '', wasteType: ''},
    image: [],
    video: [],
  });

  const {yourBid} = route.params;
  const {id} = route.params;
  const {timeLeft} = route.params;

  async function PlaceBid() {
    console.log('outside');

    if (bidPrice == 0 || bidPrice == '') {
      setAlertText('Please enter valid bid');
      setAlertFlag(true);
      return;
    } else {
      console.log('i called');
      setWaitingAlertFlag(true);
      var responce = await addBid(global.id, id, bidPrice);
      setWaitingAlertFlag(false);
      setAlertText(responce.message);
      setAlertFlag(true);
    }
  }
  async function getWasteDetail() {
    let val = await getScrapDetail(id);
    console.log(`val`, val);
    setScrapDetail(val);
    setWaitingAlertFlag(false);
    console.log(scrapDetail._data);
  }
  async function cancelBidHandler() {
    setWaitingAlertFlag(true);
    var responce = await cancelBid(global.id, id, bidPrice);
    setWaitingAlertFlag(false);
    setAlertText(responce.message);
    setAlertFlag(true);
  }

  useEffect(() => {
    getWasteDetail();
    setTime(timeLeft.split('-'));
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <WaitingAlter visible={waitingAlterFlag} />
      <Alter
        visible={alertFlag}
        onPress={() => {
          setAlertFlag(false);
          navigation.goBack();
        }}
        text={alertText}
      />
      <HeaderText
        heading={scrapDetail._data.title}
        style={{marginVertical: 10, fontSize: 22}}
      />
      <InfoText text={scrapDetail._data.wasteType} style={{fontSize: 17}} />
      <InfoText
        text={scrapDetail._data.description}
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 15,
        }}
      />

      <View style={styles.dateContainer}>
        <View style={styles.textViewContainer}>
          <InfoText
            text={time[0]}
            style={{color: 'black', fontSize: 20, paddingHorizontal: 0}}
          />
        </View>
        <Text>:</Text>
        <View style={styles.textViewContainer}>
          <InfoText
            text={time[1]}
            style={{color: 'black', fontSize: 20, paddingHorizontal: 0}}
          />
        </View>
        <Text>:</Text>
        <View style={styles.textViewContainer}>
          <InfoText
            text={time[2]}
            style={{color: 'black', fontSize: 20, paddingHorizontal: 0}}
          />
        </View>
      </View>
      {yourBid != 0 && (
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <HeaderText heading={'Your Current Bid:' + yourBid} />
        </View>
      )}

      <HeaderText heading={'Your Bid'} />
      <InputComponent
        placeHolder={String(bidPlaceHolder)}
        text={bidPrice}
        style={{marginBottom: 40}}
        textHandler={text => setBidPrice(text)}
      />
      <View style={{marginVertical: '10%'}} />
      <Button
        text="Next"
        style={{width: '80%', marginBottom: 20}}
        onPress={PlaceBid}
      />
      {yourBid != 0 && (
        <Button
          text={'Cancel Bid'}
          style={{width: '80%'}}
          onPress={cancelBidHandler}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textViewContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#c1c5d4',
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default screen;
