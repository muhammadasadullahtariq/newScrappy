/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import optionArrayImported, {
  cardOptionArray,
} from '../../components/WasteCollectorTabScreen/optionsArray';
import FlatListItemView from '../../components/WasteCollectorTabScreen/MainMenu/flatlistItem';
import CardImageTextComponent from '../../components/menuScreenComponent/cardImageAndTextComponent';
import searchImage from '../../icons/MainMenu/search.png';
import notification from '../../icons/MainMenu/notification.png';
import logOut from '../../icons/MainMenu/logOut.png';
import eye from '../../icons/MainMenu/eye.png';
import InfoText from '../../components/GlobalComponent/infoText';
//import Navigation, {useN} from '../../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [cardArray, setCardArray] = useState(cardOptionArray);
  const [optionArray, setOptionArray] = useState(optionArrayImported);
  const [columNum, setColumnNum] = useState(3);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [balance, setBalance] = useState('20000');
  useEffect(() => {});
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/*Start of Search and Card View */}
      <View style={{height: 240, width: '100%'}}>
        <View style={styles.backgroundBoxContainer}>
          {/*Top Blue View containe search Tab and notification */}
          <View style={styles.searchViewContainer}>
            <Image style={{marginLeft: '5%'}} source={searchImage} />
            <TextInput
              style={styles.textInputContainer}
              placeholder="Search"
              placeholderTextColor="white"
            />
            <View style={styles.notificationAndLogoutContainer}>
              <TouchableOpacity>
                {/* Notiification Action */}
                <Image source={notification} />
              </TouchableOpacity>
              <TouchableOpacity>
                {/* Logout Action */}
                <Image source={logOut} />
              </TouchableOpacity>
            </View>
            {/*End of Search and Notification View */}
          </View>
        </View>

        {/*Card View that containe Current Balance and withDraw Options*/}
        {/*Start of card view */}
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginHorizontal: 20,
            }}>
            {cardArray.map(item => {
              return (
                <CardImageTextComponent
                  image={item.image}
                  text={item.text}
                  key={item.Key}
                  onPress={() => navigation.navigate('TypeOfScrap')}
                />
              );
            })}
          </View>
          {/*Balance View */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 20,
            }}>
            <InfoText
              text="Balance in the Wallet"
              style={{paddingHorizontal: 0}}
            />
            <Image style={{marginTop: 3, marginLeft: 20}} source={eye} />
            <View style={{flex: 1}}></View>
            <InfoText text={'£  ' + balance} style={{paddingHorizontal: 0}} />
            {/*End Of Balance View */}
          </View>
        </View>
        {/*End Of Card And Search View */}
      </View>
      {/*End of Main View  */}
      <FlatList
        data={optionArray}
        renderItem={items => (
          <FlatListItemView
            text={items.item.text}
            image={items.item.image}
            date={items.item.date}
            status={items.item.status}
            higestBid={items.item.higestBid}
            bidCount={items.item.bidCount}
          />
        )}
        keyExtractor={(item, index) => +item.Key}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainCointainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backgroundBoxContainer: {
    height: '40%',
    width: '100%',
    backgroundColor: '#186BFE',
    flexDirection: 'row',
  },
  searchViewContainer: {
    height: 116.5,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 25,
      },
      android: {
        marginTop: 25,
      },
    }),
    marginBottom: 20,
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    marginLeft: '2%',
    color: 'white',
    height: 30,
    fontSize: 17,
    borderWidth: 0,
    padding: 0,
    paddingBottom: 10,
    width: '50%',
  },
  notificationAndLogoutContainer: {
    width: 60,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40,
  },
  cardContainer: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    height: 152,
    borderRadius: 25,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        marginTop: -28.5,
      },
      android: {
        marginTop: -28.5,
      },
    }),
  },
  balanceTextContainer: {fontSize: 15},
});

export default App;
