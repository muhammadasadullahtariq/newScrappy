import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export const component = props => {
  return (
    <View style={[style.mainView, props.style, style.shadow]}>
      <TextInput
        placeholder={props.placeHolder}
        value={props.text}
        keyboardType={props.keyBoadType}
        onChangeText={props.textHandler}
        style={[style.textCointaner, props.style1]}></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    width: '80%',
    alignSelf: 'center',
  },
  textCointaner: {
    width: '100%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default component;
