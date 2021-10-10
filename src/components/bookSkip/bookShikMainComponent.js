import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import vehicle from '../../photos/vehicle.png';
import HeaderText from '../GlobalComponent/headerText';
import Alert from '../GlobalComponent/singleButtonAlert';
import {useNavigation} from '@react-navigation/native';

const screen = () => {
  const Navgation = useNavigation();

  const [alertFlag, setAlertFlage] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Alert
        visible={alertFlag}
        text={'Book skip'}
        onPress={() => setAlertFlage(false)}
      />
      <TouchableOpacity
        onPress={() => Navgation.navigate('SearchArea')}
        style={styles.touchableOpacityContainerStyle}
        activeOpacity={0.8}>
        <View style={styles.touchableOpacityViewContainerStyle}>
          <HeaderText
            heading="Book skip"
            viewStyle={{
              alignSelf: 'flex-start',
              marginTop: 10,
              marginRight: -50,
            }}
          />
          <View
            style={{
              width: '60%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={vehicle} style={styles.imageContainer} />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAlertFlage(true)}>
            <View style={{paddingRight: 10, paddingTop: 10}}>
              <Icon name="alert-circle" color="#186BFE" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  touchableOpacityContainerStyle: {
    width: '90%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 22,
    overflow: 'hidden',
  },
  touchableOpacityViewContainerStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default screen;
