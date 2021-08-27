import React from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import maimMenu from '../Screens/mainMenu';
import homeScreen from '../Screens/homeScreen';
import offerScreen from '../Screens/offerScreen';
import firstTabImage from '../icons/bottomNavigation1.png';
import secondTabImage from '../icons/bottomNavigation2.png';
import thirdTabImage from '../icons/bottomNavigation3.png';
import forthTabImage from '../icons/bottomNavigation4.png';
import firstTabImageSelected from '../icons/bottomNavigation1changed.png';
import secondTabImageSelected from '../icons/bottomNavigation2changed.png';
import thirdTabImageSelected from '../icons/bottomNavigation3changed.png';
import forthTabImageSelected from '../icons/bottomNavigation4changed.png';
import histroyScreen from '../Screens/histroyScreen';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator
    //Bottom Navigation  
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 83,
          bottom:0
        },
      }}>
      <Tab.Screen
      //Home Screen 
        name="Home"
        component={homeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? firstTabImageSelected : firstTabImage}
                resizeMod="contain"
                style={{
                  width: 48,
                  height: 48,
                }}></Image>
            </View>
          ),
        }}
      />
      {/* Offer Screen Tab */}
      <Tab.Screen
        name="Offeres"
        component={offerScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? secondTabImageSelected : secondTabImage}
                resizeMod="contain"
                style={{
                  width: 48,
                  height: 48,
                }}></Image>
            </View>
          ),
        }}
      />
      {/* Histroy Screen Tab */}
      <Tab.Screen
        name="Histroy"
        component={histroyScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? thirdTabImageSelected : thirdTabImage}
                resizeMod="contain"
                style={{
                  width: 48,
                  height: 48,
                }}></Image>
            </View>
          ),
        }}
      />
      {/* Main Screen Tab */}
      <Tab.Screen
        name="MainMenu"
        component={maimMenu}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? forthTabImageSelected : forthTabImage}
                resizeMod="contain"
                style={{
                  width: 48,
                  height: 48,
                }}></Image>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
