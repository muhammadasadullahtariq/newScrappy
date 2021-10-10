import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderText from '../GlobalComponent/headerText';
import InfoText from '../GlobalComponent/infoText';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <HeaderText
        heading={'Booked Skip'}
        viewStyle={{
          marginTop: 10,
          marginRight: 10,
        }}
        style={{paddingLeft: 5}}
      />
      {props.data.map(item => {
        if (item.count != 0) {
          return (
            <View>
              <View
                style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}}
              />
              <View style={styles.itemViewContainer}>
                <HeaderText
                  heading={item.name}
                  viewStyle={{
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                  style={{paddingLeft: 5, paddingRight: 0}}
                />
                <InfoText
                  text={'X' + item.count}
                  style={{textAlign: 'left'}}
                  viewStyle={{alignSelf: 'center'}}
                />
                <HeaderText
                  heading={item.price.slice(1) * item.count}
                  viewStyle={{
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                  style={{paddingLeft: 5}}
                />
              </View>
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '92%',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 11,
    marginTop: 10,
  },
  itemViewContainer: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default screen;
