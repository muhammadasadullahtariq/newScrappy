import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, al} from 'react-native';

const component = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <Text style={[styles.textContainer, props.style]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    backgroundColor: '#2097f5',
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    overflow:"hidden"
  },
});

export default component;
