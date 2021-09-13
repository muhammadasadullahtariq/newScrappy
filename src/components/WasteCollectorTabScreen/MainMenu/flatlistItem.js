import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import InfroText from '../../GlobalComponent/infoText';
import reNew from '../../../icons/WasteCollerTabScreen/reNew.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const screen = props => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
          height: 36,
        }}>
        <Image source={props.image} style={{height: 36, width: 36}}></Image>
        <View
          style={{
            height: 36,
            justifyContent: 'center',
          }}>
          <InfroText
            text={props.text}
            style={{
              paddingLeft: 10,
              marginBottom: 0,
              color: '#092058',
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
        }}>
        <InfroText text={props.date} style={{color: '#7D90AA'}} />
        <View style={{flex: 1}} />
        <InfroText text={props.status} style={{color: '#7D90AA'}} />
      </View>
      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
        }}>
        {props.bidCount == 0 && (
          <InfroText
            text={'No bids'}
            style={{color: '#092058', marginTop: 12}}
          />
        )}
        {props.bidCount != 0 && (
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <InfroText text={'Higest bid'} style={{color: '#092058'}} />
            <InfroText
              text={props.higestBid}
              style={{color: '#092058', paddingLeft: 0}}
            />
          </View>
        )}
        <View style={{flex: 1}} />
        {props.status != 'Expired' && (
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <InfroText
              text={props.bidCount}
              style={{color: '#092058', paddingRight: 5}}
            />
            <InfroText
              text={'bids'}
              style={{color: '#092058', paddingLeft: 0}}
            />
          </View>
        )}
        {props.status == 'Expired' && (
          <Pressable>
            <Image source={reNew} style={{marginRight: 20}} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 22,
    backgroundColor: 'white',
    width: '95%',
    height: 138,
    alignSelf: 'center',
    marginBottom: 15.5,
  },
});

export default screen;
