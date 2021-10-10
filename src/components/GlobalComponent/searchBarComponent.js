import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import InputComponent from './inputComponent';
import Icon from 'react-native-vector-icons/Feather';

const screen = props => {
  return (
    <View style={[styles.mainContainer, props.mainContainer]}>
      <View style={styles.seacrIconViewContainer}>
        <Icon name="search" color="#186BFE" size={30} />
      </View>
      <InputComponent
        style={[{width: '70%'}, props.style]}
        placeHolder={props.placeHolder}
        text={props.text}
        textHandler={props.textHandler}
        onSubmit={props.onSubmit}
        style1={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          textAlign: 'left',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  seacrIconViewContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default screen;
