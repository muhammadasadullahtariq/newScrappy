import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import InfroText from '../GlobalComponent/infoText';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../GlobalComponent/ButtonComponent';
import Alert from '../GlobalComponent/singleButtonAlert';

const screen = props => {
  const [backColor, setBackColor] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [alertFlag, setAlertFlag] = useState(false);
  const navigation = useNavigation();
  function statusAndBackgroundColor() {
    if (props.status == 'Active') {
      console.log('Active');
      setBackColor('#fef5e4');
      setTextColor('#fb8027');
    } else if (props.status == 'Sold') {
      setBackColor('#e9f8e5');
      setTextColor('#2ba84e');
    } else {
      setBackColor('#fee4e5');
      setTextColor('#d72432');
    }
  }
  function placeAndChangeBid() {
    navigation.navigate('AddBid', {
      id: props.id,
      yourBid: props.yourBid,
      timeLeft: props.timeLeft,
    });
  }

  function collectScap() {
    setAlertFlag(true);
  }

  useEffect(() => {
    statusAndBackgroundColor();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Alert
        visibal={alertFlag}
        onPress={() => {
          setAlertFlag(false);
        }}
        text={'Scrap Collected'}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('WasteCollectorWasteDetailScreen', {
            id: props.id,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 20,
            height: 36,
          }}>
          <Image source={props.image} style={{height: 36, width: 36}}></Image>
          <View
            style={{
              height: 36,
              justifyContent: 'center',
            }}>
            <InfroText
              text={props.text}
              style={{
                paddingLeft: 10,
                marginBottom: 0,
                color: '#092058',
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
          }}>
          <InfroText text={props.date} style={{color: '#7D90AA'}} />
          <View style={{flex: 1}} />
          <View
            style={{
              height: 20,
              width: 90,
              borderRadius: 20,
              overflow: 'hidden',
              marginRight: 20,
              backgroundColor: backColor,
            }}>
            <InfroText text={props.status} style={{color: textColor}} />
          </View>
        </View>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <InfroText text={'Higest bid'} style={{color: '#ca2a33'}} />
            <InfroText
              text={'£  ' + props.higestBid}
              style={{color: '#092058', paddingLeft: 0}}
            />
          </View>
          <View style={{flex: 1}} />

          <View style={{flexDirection: 'row', marginTop: 12}}>
            <InfroText
              text={props.bidCount}
              style={{color: '#092058', paddingRight: 5}}
            />
            <InfroText
              text={'bids'}
              style={{color: '#ca2a33', paddingLeft: 0, paddingRight: 25}}
            />
          </View>
        </View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 5}}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
            }}>
            <InfroText text="Time Left" style={{paddingLeft: 0}} />
          </View>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
            }}>
            <InfroText text={props.timeLeft} style={{paddingLeft: 0}} />
          </View>
          <View style={{flex: 1}} />
          {Object.keys(props.winner).length == 0 &&
            props.status == 'Active' && (
              <ButtonComponent
                style={{borderRadius: 10}}
                text={props.yourBid == 0 ? 'Place Bid' : 'Change Bid'}
                onPress={placeAndChangeBid}
              />
            )}
          {Object.keys(props.winner).length != 0 && (
            <ButtonComponent
              style={{borderRadius: 10}}
              text={'Collect scrap'}
              onPress={collectScap}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 22,
    backgroundColor: 'white',
    width: '95%',
    height: 188,
    alignSelf: 'center',
    marginBottom: 10,
  },
  statusContainer: {},
});

export default screen;
