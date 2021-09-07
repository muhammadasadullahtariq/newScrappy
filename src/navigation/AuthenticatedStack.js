import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/tabHomeScreen';
import SelectUser from '../screens/userSelectionScreen';
import ImageUpload from '../screens/uploadImageAndVideo';

const Stack = createStackNavigator();

function AuthenticatedStack() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#007AFF" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Stack.Screen name="videoAndImageUpload" component={ImageUpload} />
        <Stack.Screen name="SelectUser" component={SelectUser} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthenticatedStack;
