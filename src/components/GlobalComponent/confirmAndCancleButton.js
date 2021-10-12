import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from './ButtonComponent';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={{width: '40%', marginLeft: 10}}>
        <ButtonComponent
          text="Confirm"
          style={styles.confirmButtonContainer}
          onPress={props.confirmOnPress}
        />
      </View>
      <View style={{width: '40%', marginRight: 10}}>
        <ButtonComponent
          text="Cancle"
          style={styles.cancleButtonContainer}
          onPress={props.cancleOnPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  confirmButtonContainer: {width: '100%', marginBottom: 20},
  cancleButtonContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'red',
  },
});

export default screen;
