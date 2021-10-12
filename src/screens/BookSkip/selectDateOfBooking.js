import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Pressable, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import HeaderText from '../../components/GlobalComponent/headerText';
import InfoText from '../../components/GlobalComponent/infoText';
import Icon from 'react-native-vector-icons/Feather';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import BookedSkip from '../../components/bookSkip/bookedSkipComponent';
import ConfirmAndCancleButton from '../../components/GlobalComponent/confirmAndCancleButton';

const screen = ({navigation, route}) => {
  const {data} = route.params;
  const {serviceData} = route.params;

  const [todayeDate, setTodayDate] = useState('');
  const [markedDate, setMarkedDate] = useState();
  const [check, setChecked] = useState(false);

  useEffect(() => {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate('2021-10-12');
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    console.log(day);
    currentDate = year + '-' + month + '-' + day;
    console.log(currentDate);
    setTodayDate(currentDate);
    setMarkedDate({
      [currentDate]: {selected: true, selectedColor: '#186BFE'},
    });
    //setMonth(month);
  }, []);
  return (
    <ScrollView style={styles.mainContainer}>
      <BookedSkip data={data} />
      <View
        style={{
          width: '92%',
          borderRadius: 11,
          justifyContent: 'center',
          backgroundColor: 'red',
          alignSelf: 'center',
          overflow: 'hidden',
          marginTop: 10,
        }}>
        <Calendar
          current={todayeDate}
          minDate={todayeDate}
          markingType={'custom'}
          markedDates={markedDate}
          onDayPress={day => {
            console.log(markedDate);
            setMarkedDate({
              [day.dateString]: {selected: true, selectedColor: '#186BFE'},
            });
          }}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          width: '92%',
          alignSelf: 'center',
          borderRadius: 11,
          backgroundColor: 'white',
        }}>
        <View style={{height: 50, justifyContent: 'center'}}>
          <HeaderText
            heading="Select time"
            viewStyle={{alignSelf: 'flex-start'}}
            style={{paddingLeft: 10}}
          />
        </View>
        <View style={{height: 1, width: '100%', backgroundColor: '#F7F8FA'}} />
        <Pressable
          style={styles.timeViewContainer}
          onPress={() => setChecked(!check)}>
          <View style={styles.headingViewContainer}>
            <InfoText
              text="7-12"
              style={{textAlign: 'left', paddingLeft: 10}}
            />
          </View>
          <View style={{flex: 1}} />
          <View style={styles.iconViewContainer}>
            <View
              style={[styles.checkboxBase, !check && styles.checkboxChecked]}>
              {!check && <Icon color="white" size={20} name="check" />}
            </View>
          </View>
        </Pressable>
        <View style={{height: 1, width: '100%', backgroundColor: '#F7F8FA'}} />
        <Pressable
          style={styles.timeViewContainer}
          onPress={() => setChecked(!check)}>
          <View style={styles.headingViewContainer}>
            <InfoText
              text="12-5"
              style={{textAlign: 'left', paddingLeft: 10}}
            />
          </View>
          <View style={{flex: 1}} />
          <View style={styles.iconViewContainer}>
            <View
              style={[styles.checkboxBase, check && styles.checkboxChecked]}>
              {check && <Icon color="white" size={20} name="check" />}
            </View>
          </View>
        </Pressable>
      </View>
      <ConfirmAndCancleButton
        confirmOnPress={() => {
          navigation.navigate('PlaceSkipOrder', {
            data: data,
            serviceData: serviceData,
            date: markedDate,
            time: check,
          });
        }}
        cancleOnPress={() => navigation.pop(2)}
      />
      {/* <ButtonComponent
        text="Confirm"
        style={{width: '60%', marginTop: 60}}
        onPress={}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  checkboxBase: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#186BFE',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },

  checkboxChecked: {
    backgroundColor: '#186BFE',
  },
  timeViewContainer: {flexDirection: 'row', height: 50},
  iconViewContainer: {maxWidth: '30%', justifyContent: 'center'},
  headingViewContainer: {
    justifyContent: 'center',
  },
});

export default screen;
