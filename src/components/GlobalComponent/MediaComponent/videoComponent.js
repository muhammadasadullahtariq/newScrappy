import React, {ref, useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
//import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';

const screen = props => {
  console.log('path', props.path);
  const [flag, setFlag] = useState(true);
  return (
    <View style={styles.mainContainer}>
      <Video
        controls={true}
        repeat={true}
        resizeMode={'contain'}
        source={{uri: props.path.uri}} // Can be a URL or a local file.
        ref={ref => {
          player = ref;
        }} // Store reference
        onLoad={() => {
          setFlag(false);
          console.log('load called');
        }}
        style={[styles.backgroundVideo]}
      />
      {flag && (
        <View style={{marginTop: -200}}>
          <ActivityIndicator size="large" color="#186BFE" />
        </View>
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
    alignSelf: 'center',
    width: '99%',
    height: 300,
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
