//This File render Options on Card View On top on the screen

import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function (props) {
  const Navigation = useNavigation();

  function navigationHandler() {
    if (props.text == 'Sell Scrap') {
      Navigation.navigate('TypeOfScrap');
    } else if (props.text == 'Book Skip') {
      Navigation.navigate('BookSkip');
    }
  }

  return (
    <TouchableOpacity
      style={[styles.mainContainer, props.style]}
      onPress={() => navigationHandler()}>
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
    height: 80,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
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
    width: 68,
    textAlign: 'center',
    color: '#092058',
    fontFamily: 'Montserrat',
  },
});
