import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Image,
} from 'react-native';
import wasteImageSource from '../../icons/WasteCollerTabScreen/paperWaste.png';

const component = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPress(props.user)}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#186BFE',
          borderWidth: 1,
          backgroundColor: props.flag ? 'white' : '#186BFE',
          width: '60%',
          alignSelf: 'center',
          borderRadius: 30,
          marginBottom: 10,
          overflow: 'hidden',
        }}>
        <Image
          source={wasteImageSource}
          style={{alignSelf: 'center', height: 30, marginLeft: '10%'}}
        />
        <Text
          style={[
            {
              padding: 14,
              height: 50,
              fontFamily: 'Montserrat',
              marginLeft: '5%',
              fontSize: 15,
              ...Platform.select({
                ios: {
                  borderRadius: 30,
                },
                android: {borderRadius: 30},
              }),
              alignSelf: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: props.flag ? '#186BFE' : 'white',
            },
            props.style,
          ]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    // padding: 10,
    // borderWidth: 1,
    // borderColor: '#2097f5',
    // {backgroundColor:props.flag==true? 'white':'#2097f5'},
    // borderRadius: 10,
    // alignSelf: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // color: '#2097f5',
    // marginBottom: 10,
  },
});

export default component;
