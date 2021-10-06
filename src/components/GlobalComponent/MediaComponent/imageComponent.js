import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
//import plusImageSource from '../../icons/WasteCollerTabScreen/plus.png';

const screen = props => {
  const [flag, setFlag] = useState(true);
  return (
    <View style={styles.mainContainer}>
      <Image
        source={props.path}
        onLoadEnd={() => setFlag(false)}
        style={[styles.imageContainer, props.style]}></Image>
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
    backgroundColor: '#F7F8FA',
    borderRadius: 5,

    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    alignSelf: 'center',
    height: 400,
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
