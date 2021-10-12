//This file render All options availabe on the screen like give gift ,all servicies etc

import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function (props) {
  const Navigation = useNavigation();
  function navigationHandler() {
    if (props.text == 'View Scrap') {
      Navigation.navigate('PostedScrap');
    } else if (props.text == 'View Skip') {
      Navigation.navigate('BookedSkip');
    }
  }

  return (
    <TouchableOpacity
      style={[styles.mainContainer, props.style]}
      onPress={navigationHandler}>
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
    width: 104,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: '3%',
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
    height: 30,
    width: 88,
    textAlign: 'center',
    color: '#092058',
    fontFamily: 'Montserrat',
  },
});
