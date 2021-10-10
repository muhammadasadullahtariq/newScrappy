import React from 'react';
import {Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import ButtonComponent from './ButtonComponent';

const screen = props => {
  return (
    <Modal visible={props.visible} transparent={true} style={{height: 3}}>
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
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{width: '40%', marginLeft: 10}}>
              <ButtonComponent
                text="OK"
                style={{width: '100%', marginBottom: 20}}
                onPress={props.okOnPress}
              />
            </View>
            <View style={{width: '40%', marginRight: 10}}>
              <ButtonComponent
                text="Cancle"
                style={{
                  width: '100%',
                  marginBottom: 20,
                  backgroundColor: 'red',
                }}
                onPress={props.CancleOnPress}
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
