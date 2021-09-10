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

export default function DisableButton() {
  return (
    <TouchableOpacity disabled={true}>
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
    backgroundColor: '#CADBFB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat',
    borderRadius: 30,
    marginTop: 30,
  },
  btnText: {
    fontSize: 15,
    color: '#ffffff',
  },
});
