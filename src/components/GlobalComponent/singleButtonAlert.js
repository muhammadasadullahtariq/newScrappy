import React from 'react';
import {Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import ButtonComponent from './ButtonComponent';

const screen = props => {
  return (
    <Modal visible={props.visibal} transparent={true} style={{height: 3}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000080',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            marginBottom: 300,
            borderRadius: 22,
          }}>
          <Text style={styles.textContainer}>{props.text}</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <View style={{width: '40%'}}>
              <ButtonComponent
                text="OK"
                style={{width: '100%', marginBottom: 40}}
                onPress={props.onPress}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {
    fontSize: 15,
    padding: 10,
    paddingBottom: 30,
    marginTop: 40,
    fontFamily: 'Montserrat',
    color: '#4F6C8D',
    textAlign: 'center',
  },
});

export default screen;
