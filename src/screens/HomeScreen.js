import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>You are logged In</Text>
      
      <View style={{marginTop: 30}}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },

  text: {
    fontSize: 30,
    color: '#092058',
  },
});
