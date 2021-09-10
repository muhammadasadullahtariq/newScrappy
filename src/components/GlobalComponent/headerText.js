import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.textContainer, props.style]}>{props.heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {
    fontSize: 17,
    color: '#092058',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
});

export default screen;
