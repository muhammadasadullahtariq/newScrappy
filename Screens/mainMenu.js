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
} from '../Component/HomeScreenComponent/optionsArray';
import {NumberOfColumn} from '../Component/HomeScreenComponent/calculateWidth';
import ImageTextComponent from '../Component/HomeScreenComponent/imageTextComponent';
import CardImageTextComponent from '../Component/HomeScreenComponent/cardImageAndTextComponent';
import searchImage from '../icons/search.png';
import notification from '../icons/notification.png';
import logOut from '../icons/logOut.png';
import eye from '../icons/eye.png';

const App = () => {
  const [cardArray, setCardArray] = useState(cardOptionArray);
  const [optionArray, setOptionArray] = useState(optionArrayImported);
  const [columNum, setColumnNum] = useState(3);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    setColumnNum(() => NumberOfColumn(windowWidth));
  }, [windowWidth]);
  Dimensions.addEventListener('change', () => {
    setWindowWidth(() => Dimensions.get('window').width);
  });
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {/*Start of Search and Card View */}
      <View style={{height: 300, width: '100%'}}>
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
            }}>
            {cardArray.map(item => {
              return (
                //+447851506252
                <CardImageTextComponent
                  image={item.image}
                  text={item.text}
                  key={item.key}
                />
              );
            })}
          </View>
          {/*Balance View */}
          <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 20}}>
            <Text style={styles.balanceTextContainer}>
              Balance in the Wallet
            </Text>
            <Image style={{marginTop: 3, marginLeft: 4}} source={eye} />
            <View style={{flex: 1}}></View>
            <Text style={[styles.balanceTextContainer, {marginRight: 5}]}>
              $ 20000
            </Text>
            {/*End Of Balance View */}
          </View>
        </View>
        {/*End Of Card And Search View */}
      </View>
      {/*End of Main View  */}
      <FlatList
        data={optionArray}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => (
          <ImageTextComponent text={items.item.text} image={items.item.image} />
        )}
        numColumns={columNum}
        key={columNum}
        keyExtractor={(item, index) => +item.key}
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
    backgroundColor: '#007AFF',
    flexDirection: 'row',
  },
  searchViewContainer: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 50,
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
    height: '60%',
    borderRadius: 25,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        marginTop: -40,
      },
      android: {
        marginTop: -50,
      },
    }),
  },
  balanceTextContainer: {fontSize: 15},
});

export default App;
