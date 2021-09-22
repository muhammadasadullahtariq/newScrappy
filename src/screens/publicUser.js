import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import maimMenu from './PublicUserChildScreen/mainMenu';
import homeScreen from './PublicUserChildScreen/homeScreen';
import offerScreen from './PublicUserChildScreen/offerScreen';
import firstTabImage from '../icons/TabScreen/bottomNavigation1.png';
import secondTabImage from '../icons/TabScreen/bottomNavigation2.png';
import thirdTabImage from '../icons/TabScreen/bottomNavigation3.png';
import forthTabImage from '../icons/TabScreen/bottomNavigation4.png';
import firstTabImageSelected from '../icons/TabScreen/bottomNavigation1changed.png';
import secondTabImageSelected from '../icons/TabScreen/bottomNavigation2changed.png';
import thirdTabImageSelected from '../icons/TabScreen/bottomNavigation3changed.png';
import forthTabImageSelected from '../icons/TabScreen/bottomNavigation4changed.png';
import histroyScreen from './PublicUserChildScreen/histroyScreen';
import Orientation from 'react-native-orientation';
const Tab = createBottomTabNavigator();

function MyTabs() {
  useEffect(() => {
    Orientation.unlockAllOrientations();
  });

  return (
    <Tab.Navigator
      //Bottom Navigation
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          height: 83,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
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
