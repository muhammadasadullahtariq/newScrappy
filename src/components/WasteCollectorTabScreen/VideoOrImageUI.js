import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Video from 'react-native-video';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      {!props.flag && (
        <Image source={props.path} style={styles.imageContainer}></Image>
      )}
      {props.flag && (
        <Video
          controls={true}
          resizeMode={'contain'}
          source={props.path} // Can be a URL or a local file.
          ref={ref => {
            player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
        />
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
  },
  backgroundVideo: {
    aspectRatio: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default screen;
