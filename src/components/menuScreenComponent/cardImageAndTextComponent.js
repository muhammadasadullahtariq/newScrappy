//This File render Options on Card View On top on the screen

import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

export default function (props) {
  return (
    <TouchableOpacity style={[styles.mainContainer, props.style]}>
      <View style={styles.imageViewContainer}>
        <Image source={props.image} />
      </View>
      <Text style={styles.textContainer}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 22,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    height: 104,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewContainer: {
    height: 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 3,
    fontSize: 11,
    width: 66,
    textAlign: 'center',
    color: '#092058',
    fontFamily: 'Montserrat',
  },
});
