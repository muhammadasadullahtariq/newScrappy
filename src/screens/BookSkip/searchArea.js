import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchBar from '../../components/GlobalComponent/searchBarComponent';
import InfoText from '../../components/GlobalComponent/infoText';
import RBSheet from 'react-native-raw-bottom-sheet';
import HeaderText from '../../components/GlobalComponent/headerText';
import SkipSizeListComponent from '../../components/bookSkip/skipSizeListComponent';
import skipSizeData from '../../Functions/bookSkip/skipSizeDataArray';
import Alert from '../../components/GlobalComponent/singleButtonAlert';
import ConfrmAndCancleButton from '../../components/GlobalComponent/confirmAndCancleButton';
import dimensionHandler from '../../Functions/Global/dimensionHandler';

const screen = ({navigation, route}) => {
  const [areaAddress, setAreaAddress] = useState('');
  const [dataArray, setDataArray] = useState(['sw1ab', 'sw2ab', 'abc', 'cdf']);
  const refRBSheet = useRef();
  const [skipSizeDataArr, setSkipSizeDataArr] = useState([
    {name: '6 Yard Skip', price: '£300', alert: 'Collect 6 yard', count: 0},
    {
      name: '8 Yard Skip',
      price: '£500',
      alert: 'Collect * Yard Skip',
      count: 0,
    },
    {
      name: '12 Yard Skip',
      price: '£900',
      alert: 'Collect 12 Yard Skip',
      count: 0,
    },
    {
      name: '16 Yard Skip',
      price: '£1300',
      alert: 'Collect 16 Yard Skip',
      count: 0,
    },
  ]);
  const [alertFlag, setAlertFlag] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    dimensionHandler(setScreenHeight);
  }, [screenHeight]);
  function listFunction(item) {
    return (
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={styles.listItemToucnContainer}
        activeOpacity={0.8}>
        <InfoText text={item} style={styles.InfoTextContainer} />
      </TouchableOpacity>
    );
  }
  async function numbersCheck() {
    for (var i = 0; i < skipSizeData.length; i++) {
      if (skipSizeData[i].count > 0) return true;
    }
    return false;
  }
  async function checkValidation() {
    var responce = await numbersCheck();
    if (responce) {
      navigation.navigate('SkipService', {data: skipSizeData});
    } else {
      setAlertFlag(true);
      return;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Alert
        visible={alertFlag}
        onPress={() => setAlertFlag(false)}
        text={'Please Select atleast one Skip'}
      />
      <SearchBar
        placeHolder={'Search Post Code'}
        textHandler={text => setAreaAddress(text)}
      />
      <FlatList
        data={dataArray}
        renderItem={items => listFunction(items.item)}
        keyExtractor={item => item}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={screenHeight - 150}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#186BFE',
          },
        }}>
        <ScrollView>
          <View
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'baseline',
            }}>
            <HeaderText heading="Select Skip Size" />
          </View>
          <View
            style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}}
          />
          {skipSizeDataArr.map((item, index) => {
            return (
              <View>
                <SkipSizeListComponent
                  name={item.name}
                  price={item.price}
                  alert={item.alert}
                  count={item.count}
                  onPositivePress={() => {
                    var data = [...skipSizeDataArr];
                    data[index].count = data[index].count + 1;
                    setSkipSizeDataArr(data);
                  }}
                  onMinusPress={() => {
                    var data = [...skipSizeDataArr];
                    data[index].count = data[index].count - 1;
                    setSkipSizeDataArr(data);
                  }}
                />
                <View
                  style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}}
                />
              </View>
            );
          })}
          <ConfrmAndCancleButton
            confirmOnPress={() => {
              refRBSheet.current.close();
              checkValidation();
            }}
            cancleOnPress={() => {
              refRBSheet.current.close();
            }}
          />
          {/* <ButtonComponent
            onPress={}
            text={'Confirm'}
            style={{width: '80%', marginTop: 20}}
          /> */}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  listItemToucnContainer: {
    width: '100%',
    marginTop: 0.5,
    backgroundColor: 'white',
  },
  InfoTextContainer: {paddingVertical: 10},
});

export default screen;
