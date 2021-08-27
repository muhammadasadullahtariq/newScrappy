/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {StatusBar} from 'react-native';
 import Tab from './Navigation/tabNavigation';//Import Tab Navigator
 import { NavigationContainer } from '@react-navigation/native';
 import Main from "./Screens/mainMenu"
 
 const App = () => {
   return (
     <Main/>
   );
 };
 
 export default App;
 