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
//import WasteCollecterHomeScreen from '../screens/wasteCollector';
import TypeOfScrap from '../screens/PublicUserChildScreen/selectTypeOfScrap';
import ScrapDataUpload from '../screens/PublicUserChildScreen/scrapDataUpload';
import WasteDetailScreen from '../screens/PublicUserChildScreen/wasteDetailScreen';
import PublicUserHomeScreen from '../screens/publicUser';
import WasteCollectorHomeScreen from '../screens/wasteCollectorHomeScreen';
import AddBid from '../screens/WasteCollectorChildScreens/addBidScreen';
import WasteCollectorWasteDetailScreen from '../screens/WasteCollectorChildScreens/wasteDetailScreen';

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
        initialRouteName="Splash">
        {/* initial Route Name */}
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
        <Stack.Screen
          name="WasteCollectorHomeScreen"
          component={WasteCollectorHomeScreen}
        />
        <Stack.Screen name="WasteBuyer" component={WasteBuyer} />
        {/* <Stack.Screen
          name="WasteCollectorHomeScreen"
          component={WasteCollecterHomeScreen}
        /> */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TypeOfScrap"
          options={{
            title: 'Sell your scrap',
          }}
          component={TypeOfScrap}
        />
        <Stack.Screen
          name="ScrapDataUpload"
          options={{
            title: 'Sell your scrap',
          }}
          component={ScrapDataUpload}
        />
        <Stack.Screen
          name="WasteDetailScreen"
          options={{
            title: 'Scrap Detail',
          }}
          component={WasteDetailScreen}
        />
        <Stack.Screen name="WasteCollector" component={WasteCollector} />
        <Stack.Screen name="AddBid" component={AddBid} />
        <Stack.Screen
          name="WasteCollectorWasteDetailScreen"
          options={{
            title: 'Scrap Detail',
          }}
          component={WasteCollectorWasteDetailScreen}
        />
        <Stack.Screen name="PublicUser" component={PublicUserHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
