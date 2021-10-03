import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Platform} from 'react-native';
import InfoText from './infoText';

export const component = props => {
  return (
    <View style={[style.mainView, props.style, style.shadow]}>
      <InfoText
        text={props.tag}
        style={{
          paddingHorizontal: 10,
          paddingLeft: 5,
          marginVertical: 10,
        }}
      />
      <TextInput
        placeholder={props.placeHolder}
        value={props.text}
        returnKeyType="go"
        multiline={props.multiLine}
        numberOfLines={props.numberOfLines}
        keyboardType={props.keyBoadType}
        onChangeText={props.textHandler}
        style={[
          style.textCointaner,
          props.style1,
          {
            borderColor: props.flag ? 'red' : '#ffffff',
            
            ...Platform.select({
              ios: {
                paddingTop: 5,
              },
              android: {paddingTop: props.flag ? 15 : 0,},
            }),
          },
        ]}
        textAlignVertical={props.flag ? 'top' : 'center'}
        onSubmitEditing={props.onSubmit}></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    width: '80%',
    alignSelf: 'center',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCointaner: {
    width: '80%',
    borderWidth: 1,
    padding: 5,
    ...Platform.select({
      ios: {
        paddingTop: 5,
      },
      android: {paddingTop: 5},
    }),
    color: '#092058',
    borderRadius: 11,
    backgroundColor: '#ffffff',
    height: '60%',
    fontSize: 15,
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
});

export default component;
