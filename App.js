import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import auth from '@react-native-firebase/auth';
import AuthenticatedStack from './src/navigation/AuthenticatedStack';
import {LogBox} from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [authenticated, setAuthenticated] = React.useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (!authenticated) return <AuthenticatedStack />;
  else return <Navigation />;
}

const styles = StyleSheet.create({});
