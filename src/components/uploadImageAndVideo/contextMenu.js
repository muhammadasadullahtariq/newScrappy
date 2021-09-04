import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
} from 'react-native';

const screen = props => {
  const array = [];
  return (
    <Modal
      visible={props.visibal}
      transparent={true}
      style={{height: 3}}
      onRequestClose={props.closeMenu}>
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
            width: '60%',
            marginBottom: 300,
          }}>
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              color: '#007AFF',
              backgroundColor: 'white',
            }}>
            {props.heading}
          </Text>
          <View style={{height: 1, backgroundColor: '#007AFF'}}></View>
          {props.array.map(item => {
            return (
              <Pressable
                onPress={() => {
                  props.itemPressed(item, props.array.indexOf(item));
                  console.log(item);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10,
                    marginTop: 0.5,
                    backgroundColor: 'white',
                  }}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {},
});

export default screen;
