import React, {useState} from 'react';
import {Dimensions} from 'react-native';

function dimensionHandler(setWidth) {
  Dimensions.addEventListener('change', () => {
    setWidth(Dimensions.get('window').height);
  });
}

export default dimensionHandler;
