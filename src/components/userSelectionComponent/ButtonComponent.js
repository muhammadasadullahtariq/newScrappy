import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const component = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPress(props.user)}>
      <Text
        style={[
          {
            padding: 10,
            borderWidth: 1,
            borderColor: '#2097f5',
            backgroundColor: props.flag ? '#2097f5' : 'white',
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: props.flag ? 'white' : '#2097f5',
            marginBottom: 10,
            width: '80%',
          },
          props.style,
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    // padding: 10,
    // borderWidth: 1,
    // borderColor: '#2097f5',
    // {backgroundColor:props.flag==true? 'white':'#2097f5'},
    // borderRadius: 10,
    // alignSelf: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // color: '#2097f5',
    // marginBottom: 10,
  },
});

export default component;