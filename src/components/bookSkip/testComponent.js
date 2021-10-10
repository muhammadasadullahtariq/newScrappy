import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import dataArr from '../../Functions/bookSkip/skipSizeDataArray';
import HeaderText from '../GlobalComponent/headerText';
import InfoText from '../GlobalComponent/infoText';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={{height: 2, width: '100%', backgroundColor: '#F7F8FA'}} />
      <View style={styles.itemViewContainer}>
        <HeaderText
          heading={props.name}
          viewStyle={{
            alignSelf: 'flex-start',
            marginTop: 10,
            marginLeft: 10,
          }}
          style={{paddingLeft: 5, paddingRight: 0}}
        />
        <InfoText
          text={props.text}
          style={{textAlign: 'left'}}
          viewStyle={{alignSelf: 'center'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
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