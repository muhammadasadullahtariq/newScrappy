import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';

const component = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <Text style={[styles.textContainer, props.style]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 14,
    height: 50,
    fontFamily: 'Montserrat',
    fontSize: 15,
    backgroundColor: '#186BFE',

    ...Platform.select({
      ios: {
        borderRadius: 30,
      },
      android: {borderRadius: 30},
    }),
    alignSelf: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 10,
    overflow: 'hidden',
  },
});

export default component;
