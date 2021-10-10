import React, {useState, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItemComponent from '../../components/bookSkip/skipServiceComponent';
import dataArr from '../../Functions/bookSkip/skipServiceData';
import ButtonComponent from '../../components/GlobalComponent/ButtonComponent';
import BookedSkip from '../../components/bookSkip/bookedSkipComponent';

const screen = ({navigation, route}) => {
  const [skipServiceArr, setSkipServiceArr] = useState(dataArr);
  const {data} = route.params;

  return (
    <View style={styles.mainContainer}>
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
      <ButtonComponent
        text="Confirm"
        style={{width: '60%', marginTop: 60}}
        onPress={() => {
          navigation.navigate('SelectDateAndTime', {
            data: data,
            serviceData: setSkipServiceArr,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({mainContainer: {}});

export default screen;
