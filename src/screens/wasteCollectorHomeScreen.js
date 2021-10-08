import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import ButtonComponent from '../components/WasteCollector/buttonComponent';
import FlatListItemView from '../components/WasteCollector/listComponent';
import getWasteData from '../Functions/wasteCollector/wasteCollectorData';
import sellSrap from '../icons/WasteCollerTabScreen/sellScrap.png';
import WaitingComponent from '../components/GlobalComponent/waitingAlertComponent';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import reverseDate from '../Functions/Global/dateReverse';
import DropDownPicker from 'react-native-dropdown-picker';

const screen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState([]);
  const [option, setOption] = useState('');
  const [waitingAlertFlag, setWaitingAlertFlag] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Select Scrap Type');
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Metal', value: 'Metal'},
    {label: 'Paper', value: 'Paper'},
    {label: 'Plastic', value: 'Plastic'},
    {label: 'Mixed', value: 'Mixed'},
  ]);

  useEffect(() => {
    //global.id = '614882e461895615992ecf5f';
    if (isFocused) {
      if (option == 'All' || option == '') {
        getUserWasteData();
      } else {
        fecthDataWithArgument(option);
      }
    }
  }, [isFocused]);

  async function filterArray(title) {
    console.log(title);
    setOption(title);
    if (title == 'Logout') {
      auth().signOut();
      navigation.navigate('PhoneAuthScreen');
      return;
    }
    if (title == 'All') {
      await getUserWasteData();
      return;
    }
    await fecthDataWithArgument(title);
  }
  async function fecthDataWithArgument(title) {
    setWaitingAlertFlag(true);
    const data = await getWasteData(global.id, title + ' Scrap');
    console.log('data', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  async function getUserWasteData() {
    const data = await getWasteData(global.id);
    console.log('data array', data);
    setWaitingAlertFlag(false);
    setUserData(data.data.data);
  }

  return (
    <View style={styles.mainContainer}>
      <WaitingComponent visible={waitingAlertFlag} />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        placeholder={'Select scrap type'}
        setOpen={setOpen}
        disableBorderRadius={true}
        setValue={setValue}
        onChangeValue={item => filterArray(item)}
        setItems={setItems}
        style={{
          width: '100%',
          alignSelf: 'center',

          borderRadius: 11,
          marginVertical: 5,
          backgroundColor: '#ffffffff',
          borderColor: '#ffffffff',
        }}
        containerStyle={{width: '95%', alignSelf: 'center', marginVertical: 5}}
        dropDownContainerStyle={{
          backgroundColor: '#ffffffff',
          borderColor: '#ffffffff',
          width: '100%',
          alignSelf: 'center',
        }}
      />
      {/* horizontal ScrollView that containe the buttons insted of dropDown list */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topButtonArray.map(item => {
          return (
            <ButtonComponent
              key={item.name}
              text={item.name}
              onPress={() => filterArray(item.name)}
              flag={item.flag}
              style={{marginVertical: 5, marginBottom: 15}}
            />
          );
        })}
      </ScrollView> */}
      <FlatList
        data={userData}
        renderItem={items => (
          <FlatListItemView
            text={items.item.name}
            image={sellSrap}
            id={items.item._id}
            date={items.item.date.substring(0, 10)}
            status={items.item.status}
            higestBid={items.item.highestBid}
            bidCount={items.item.biddingCount}
            yourBid={items.item.yourApplyBid}
            winner={items.item.winner}
            timeLeft={reverseDate(items.item.timeLeft.substring(0, 10))}
            userId={global.id}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default screen;
