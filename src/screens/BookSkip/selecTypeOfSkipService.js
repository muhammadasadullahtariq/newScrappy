import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItemComponent from '../../components/bookSkip/skipServiceComponent';
import dataArr from '../../Functions/bookSkip/skipServiceData';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import BookedSkip from '../../components/bookSkip/bookedSkipComponent';
import ConfirmAndCancleButton from '../../components/GlobalComponent/confirmAndCancleButton';
import Alert from '../../components/GlobalComponent/singleButtonAlert';
import {useIsFocused} from '@react-navigation/native';

const screen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [skipServiceArr, setSkipServiceArr] = useState([
    {name: 'Off Road', detail: 'Private Property or DriveAway', flag: false},
    {
      name: 'On Road',
      detail:
        '30 minute free loading time £1 cahrge for every minute thereafter',
      flag: false,
    },
    {name: 'Load and Waight', detail: 'Road or Street', flag: false},
  ]);
  const {data} = route.params;
  const [selectedOption, setSelectedOption] = useState(-1);
  const [alertFlag, setAlertFlag] = useState(false);
  const [alertText, setAlertText] = useState(
    'Please Select atleast one catagory',
  );

  useEffect(() => {
    if (isFocused) {
      //setSkipServiceArr(dataArr);
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <Alert
        visible={alertFlag}
        text={alertText}
        onPress={() => setAlertFlag(false)}
      />
      <BookedSkip data={data} />
      <FlatList
        data={skipServiceArr}
        keyExtractor={item => item.name}
        renderItem={items => (
          <View>
            <ListItemComponent
              name={items.item.name}
              detail={items.item.detail}
              check={items.item.flag}
              onPress={() => {
                console.log('i called');
                var data = [...skipServiceArr];
                if (selectedOption != -1) {
                  data[selectedOption].flag = false;
                }
                //selectedOption = items.index;
                setSelectedOption(items.index);
                data[items.index].flag = !data[items.index].flag;
                setSkipServiceArr(data);
              }}
            />
            <View
              style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}}
            />
          </View>
        )}
      />
      <ConfirmAndCancleButton
        confirmOnPress={() => {
          if (selectedOption == -1) {
            setAlertFlag(true);
            return;
          } else {
            navigation.navigate('SelectDateAndTime', {
              data: data,
              serviceData: setSkipServiceArr,
            });
          }
        }}
        cancleOnPress={() => navigation.goBack()}
      />
      {/* <ButtonComponent
        text="Confirm"
        style={{width: '60%', marginTop: 60}}
        onPress={}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({mainContainer: {}});

export default screen;
