import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textContainer}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default screen;
