import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
//import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={props.path}
        style={[styles.imageContainer, props.style]}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  imageContainer: {
    width: '99%',
    alignSelf: 'center',
    height: 400,
    marginTop: 10,
    borderRadius: 5,
  },
  backgroundVideo: {
    aspectRatio: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  addImageButtonContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    marginRight: 10,
    borderColor: '#979797',
  },
});

export default screen;
