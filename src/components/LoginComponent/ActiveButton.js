import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ActiveButton({onpress}) {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>Next</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: WIDTH / 1.55,
    height: 50,
    backgroundColor: '#186BFE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  btnText: {
    fontSize: 15,
    color: '#ffffff',
  },
});
