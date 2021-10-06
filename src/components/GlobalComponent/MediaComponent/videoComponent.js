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
        controls={false}
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
  mainContainer: {
    borderRadius: 5,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    aspectRatio: 1,
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  backgroundVideo: {
    width: '100%',
    alignSelf: 'center',
    height: 400,
    borderRadius: 30,
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
