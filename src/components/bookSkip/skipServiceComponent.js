import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import HeaderText from '../GlobalComponent/headerText';
import InfoText from '../GlobalComponent/infoText';
import Icon from 'react-native-vector-icons/Feather';

const screen = props => {
  return (
    <Pressable style={styles.mainContainer} onPress={props.onPress}>
      <View style={styles.iconViewContainer}>
        <View
          style={[styles.checkboxBase, props.check && styles.checkboxChecked]}>
          {props.check && <Icon color="white" size={20} name="check" />}
        </View>
      </View>
      <View style={styles.headingViewContainer}>
        <HeaderText
          heading={props.name}
          viewStyle={{alignSelf: 'flex-start'}}
          style={{paddingLeft: 10}}
        />
        <InfoText
          text={props.detail}
          style={{textAlign: 'left', paddingLeft: 10}}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 100,
    width: '92%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 11,
    alignSelf: 'center',
  },
  iconViewContainer: {maxWidth: '30%', justifyContent: 'center'},
  checkboxBase: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#186BFE',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },

  checkboxChecked: {
    backgroundColor: '#186BFE',
  },
  headingViewContainer: {
    justifyContent: 'center',
  },
});

export default screen;
