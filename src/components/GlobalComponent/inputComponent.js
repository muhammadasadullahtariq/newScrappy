import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';

export const component = props => {
  return (
    <View style={[style.mainView, props.style, style.shadow]}>
      <TextInput
        placeholder={props.placeHolder}
        value={props.text}
        returnKeyType="go"
        multiline={true}
        numberOfLines={props.numberOfLines}
        keyboardType={props.keyBoadType}
        onChangeText={props.textHandler}
        style={[style.textCointaner, props.style1]}
        textAlignVertical="center"
        onSubmitEditing={props.onSubmit}></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
  },
  textCointaner: {
    width: '100%',
    padding: 5,
    color: '#092058',
    borderRadius: 11,
    backgroundColor: '#ffffff',
    height: '100%',
    fontSize: 15,
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});

// #a {
//   width: 187px;
//   height: 15px;
//   color: #092058;
//   font-family: Montserrat;
//   font-size: 15px;
//   font-weight: 500;
//   line-height: 19.5px;
//   text-align: center;
// }

// #input {
//   width: 312px;
//   height: 50px;
// }

// #rectangle {
//   width: 311px;
//   height: 50px;
//   border-radius: 11px;
//   background: #ffffff;
// }

// #enteryourp {
//   width: 135px;
//   height: 20px;
//   color: #7d90aa;
//   font-family: Montserrat;
//   font-size: 13px;
//   font-weight: 400;
//   line-height: 19.5px;
//   text-align: center;
// }

export default component;
