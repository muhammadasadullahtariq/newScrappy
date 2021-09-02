import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';

import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import HomeScreen from '../screens/tabHomeScreen';
import UserSelectionScreen from '../screens/userSelectionScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#007AFF"
        translucent={true}
      />
      <Stack.Navigator
        headerMode="screen"
        initialRouteName="UserSelectionScreen">
        <Stack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen} />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="UserSelectionScreen"
          component={UserSelectionScreen}
          options={{
            title: 'Register',
            headerStyle: {backgroundColor: '#007AFF'},
            headerTitleStyle: {
              color: 'white',
              textAlign: 'center',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
