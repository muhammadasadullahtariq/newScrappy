import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InfoText from '../GlobalComponent/infoText';
import HeaderText from '../GlobalComponent/headerText';
import Icon from 'react-native-vector-icons/Feather';
import Alert from '../GlobalComponent/singleButtonAlert';

const screen = props => {
  const [alertFlag, setAlertFlage] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Alert
        visible={alertFlag}
        onPress={() => setAlertFlage(false)}
        text={props.alert}
      />
      <View style={styles.headingViewContainer}>
        <HeaderText
          heading={props.name}
          viewStyle={{alignSelf: 'flex-start'}}
          style={{paddingLeft: 10}}
        />
        <InfoText
          text={props.price}
          style={{textAlign: 'left', paddingLeft: 10}}
        />
      </View>
      <View style={styles.alertViewContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setAlertFlage(true)}>
          <View style={{paddingRight: 10, paddingTop: 10}}>
            <Icon name="alert-circle" color="red" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}></View>
      <View style={styles.countViewContainer}>
        {props.count != 0 && (
          <TouchableOpacity activeOpacity={0.8} onPress={props.onMinusPress}>
            <View style={{paddingLeft: 10, paddingTop: 10}}>
              <Icon name="minus-circle" color="#186BFE" size={30} />
            </View>
          </TouchableOpacity>
        )}
        {props.count != 0 && (
          <InfoText
            text={props.count}
            style={{
              fontSize: 20,
              paddingTop: 10,
              paddingHorizontal: 10,
            }}
          />
        )}
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPositivePress}>
          <View
            style={{
              paddingRight: 10,
              paddingTop: 10,
              paddingLeft: props.count != 0 ? 0 : 10,
            }}>
            <Icon name="plus-circle" color="#186BFE" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {width: '100%', height: 70, flexDirection: 'row'},
  headingViewContainer: {
    maxWidth: '40%',
    minWidth: '35%',
    height: '100%',
    justifyContent: 'center',
  },
  alertViewContainer: {
    maxWidth: '20%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  countViewContainer: {
    flexDirection: 'row',
    maxWidth: '40%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default screen;
