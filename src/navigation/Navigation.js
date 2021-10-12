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
import TypeOfScrap from '../screens/PublicUserChildScreen/selectTypeOfScrap';
import ScrapDataUpload from '../screens/PublicUserChildScreen/scrapDataUpload';
import WasteDetailScreen from '../screens/PublicUserChildScreen/wasteDetailScreen';
import PublicUserHomeScreen from '../screens/publicUser';
import WasteCollectorHomeScreen from '../screens/wasteCollectorHomeScreen';
import AddBid from '../screens/WasteCollectorChildScreens/addBidScreen';
import WasteCollectorWasteDetailScreen from '../screens/WasteCollectorChildScreens/wasteDetailScreen';
import BookSkip from '../screens/bookSkip';
import SearchArea from '../screens/BookSkip/searchArea';
import SkipService from '../screens/BookSkip/selecTypeOfSkipService';
import SelectDateAndTime from '../screens/BookSkip/selectDateOfBooking';
import PlaceSkipOrder from '../screens/BookSkip/placeOrder';
import PostedScrap from '../screens/PublicUserChildScreen/postedScrap';
import BookedSkip from '../screens/PublicUserChildScreen/bookedSkip';

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
        <Stack.Screen
          name="PhoneAuthScreen"
          component={PhoneAuthScreen}
          options={{
            title: 'Welcome to Scrappy',
          }}
        />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
          options={{title: 'Phone verification'}}
        />
        <Stack.Screen
          name="Registration"
          component={UserSelectionScreen}
          options={{
            title: 'Registration',
          }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="HomeUser"
          component={HomeUser}
          options={{title: 'Details'}}
        />
        <Stack.Screen
          name="YardUser"
          component={YardUser}
          options={{title: 'Details'}}
        />
        <Stack.Screen
          name="WasteCollectorHomeScreen"
          component={WasteCollectorHomeScreen}
        />
        <Stack.Screen
          name="WasteBuyer"
          component={WasteBuyer}
          options={{title: 'Details'}}
        />
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
            title: 'Select scrap category',
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
        <Stack.Screen
          name="WasteCollector"
          component={WasteCollector}
          options={{title: 'Details'}}
        />
        <Stack.Screen name="AddBid" component={AddBid} />
        <Stack.Screen
          name="WasteCollectorWasteDetailScreen"
          options={{
            title: 'Scrap Detail',
          }}
          component={WasteCollectorWasteDetailScreen}
        />

        {/*Book Skip Related Screens */}
        <Stack.Screen
          name="BookSkip"
          component={BookSkip}
          options={{title: 'Book your skip'}}
        />
        <Stack.Screen
          name="SearchArea"
          component={SearchArea}
          options={{title: 'Book your skip'}}
        />
        <Stack.Screen
          name="SkipService"
          component={SkipService}
          options={{title: 'Skip Service'}}
        />
        <Stack.Screen
          name="SelectDateAndTime"
          component={SelectDateAndTime}
          options={{title: 'Pick Date'}}
        />
        <Stack.Screen
          name="PlaceSkipOrder"
          component={PlaceSkipOrder}
          options={{title: 'Place Order'}}
        />
        {/*Public User Related Screens*/}
        <Stack.Screen
          name="PostedScrap"
          component={PostedScrap}
          options={{title: 'Posted Scrap'}}
        />
        <Stack.Screen
          name="PublicUser"
          component={PublicUserHomeScreen}
          options={{title: 'Your Dashboard'}}
        />
        <Stack.Screen
          name="BookedSkip"
          component={BookedSkip}
          options={{title: 'Booked Skip'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
