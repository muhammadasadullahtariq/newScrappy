import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderText from '../GlobalComponent/headerText';
import Alert from '../GlobalComponent/singleButtonAlert';

const screen = props => {
  const [alertFlag, setAlertFlage] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Alert
        visible={alertFlag}
        text={props.alert}
        onPress={() => setAlertFlage(false)}
      />
      <TouchableOpacity
        style={styles.touchableOpacityContainerStyle}
        activeOpacity={0.8}>
        <View style={styles.touchableOpacityViewContainerStyle}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <HeaderText
              heading={props.name}
              viewStyle={{
                alignSelf: 'flex-start',
                marginTop: 10,
                marginRight: -50,
              }}
              style={{paddingLeft: 5}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAlertFlage(true)}>
              <View style={{paddingRight: 5, paddingTop: 10}}>
                <Icon name="alert-circle" color="#186BFE" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={props.image} style={styles.imageContainer} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '50%',
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default screen;
