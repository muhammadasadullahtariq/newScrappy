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
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';

const screen = props => {
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
            marginTop: '70%',
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <HeaderText
            heading={props.heading}
            style={{height: 52, alignSelf: 'center', paddingVertical: 16.5}}
          />
          <View style={{height: 1, backgroundColor: '#F7F8FA'}}></View>
          {props.array.map(item => {
            return (
              <View>
                <Pressable
                  onPress={() => {
                    props.itemPressed(item, props.array.indexOf(item));
                    console.log(item);
                  }}>
                  <InfoText
                    text={item}
                    style={{
                      height: 52,
                      paddingVertical: 16.5,
                      alignSelf: 'flex-start',
                    }}
                  />
                </Pressable>
                <View style={{height: 1, backgroundColor: '#F7F8FA'}}></View>
              </View>
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
