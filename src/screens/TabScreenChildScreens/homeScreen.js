import React,{useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from "@react-native-firebase/auth"

export default function ({Navigation}) {
  useEffect(()=>{//auth().signOut()
  },[])
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>{'Home Screen'}</Text>
    </View>
  );
}
