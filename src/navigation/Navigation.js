import * as React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';

import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import HomeScreen from '../screens/tabHomeScreen';
import UserSelectionScreen from '../screens/userRegistrationScreen';
import HomeUser from '../screens/UsersgatherDataScreen/homeuser';
import YardUser from '../screens/UsersgatherDataScreen/yarduser';
import WasteCollector from '../screens/UsersgatherDataScreen/wasteCollectoruser';
import WasteBuyer from '../screens/UsersgatherDataScreen/wasteBuyeruser';
import icon from '../icons/Navigation/Back.png';
import Splash from '../screens/splashScreen';
import WasteCollecterHomeScreen from '../screens/wasteCollector';
import TypeOfScrap from '../screens/WasteCollecterChildScreen/selectTypeOfScrap';
import ScrapDataUpload from '../screens/WasteCollecterChildScreen/scrapDataUpload';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#186BFE"
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#186BFE'},
          headerTitleStyle: {
            textAlign: 'center',
            color: 'white',
          },
          headerBackImage: () => <Image source={icon} />,
        }}
        initialRouteName="WasteCollectorHomeScreen">
        <Stack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen} />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
        />
        <Stack.Screen
          name="Registration"
          component={UserSelectionScreen}
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeUser" component={HomeUser} />
        <Stack.Screen name="YardUser" component={YardUser} />
        <Stack.Screen name="WasteCollector" component={WasteCollector} />
        <Stack.Screen name="WasteBuyer" component={WasteBuyer} />
        <Stack.Screen
          name="WasteCollectorHomeScreen"
          component={WasteCollecterHomeScreen}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="TypeOfScrap" component={TypeOfScrap} />
        <Stack.Screen name="ScrapDataUpload" component={ScrapDataUpload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
