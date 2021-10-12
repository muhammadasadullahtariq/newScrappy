import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderText from '../../GlobalComponent/headerText';
import InfoText from '../../GlobalComponent/infoText';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <HeaderText heading={props.date} />
        <HeaderText heading={props.from + '-' + props.to} />
      </View>
      {props.data.map(item => {
        if (item.count != 0) {
          return (
            <View>
              <View
                style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}}
              />
              <View style={styles.itemViewContainer}>
                <InfoText
                  text={item.name}
                  viewStyle={{
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                  style={{paddingLeft: 5, paddingRight: 0}}
                />
                <InfoText
                  text={'X' + item.quantity}
                  style={{textAlign: 'left'}}
                  viewStyle={{alignSelf: 'center'}}
                />
                <InfoText
                  text={'£' + item.price}
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
    width: '95%',
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
