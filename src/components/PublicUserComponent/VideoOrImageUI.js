import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      {!props.flag && props.path != '' && (
        <Image source={props.path} style={styles.imageContainer}></Image>
      )}
      {props.flag && (
        <Video
          controls={false}
          repeat={true}
          resizeMode={'contain'}
          source={props.path} // Can be a URL or a local file.
          ref={ref => {
            player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
        />
      )}
      {props.path == '' && (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
          <View style={styles.addImageButtonContainer}>
            <Image source={plusImageSource} style={{}} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  imageContainer: {
    aspectRatio: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
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
