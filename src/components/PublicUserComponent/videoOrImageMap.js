import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, FlatList, Text} from 'react-native';
import {NumberOfColumn} from '../menuScreenComponent/calculateWidth';
import ImageComponent from './VideoOrImageUI';

const screen = props => {
  const [columNum, setColumnNum] = useState(3);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    console.log(props.Array);
    setColumnNum(() => NumberOfColumn(windowWidth));
  }, [windowWidth]);
  Dimensions.addEventListener('change', () => {
    setWindowWidth(() => Dimensions.get('window').width);
  });
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={props.Array}
        renderItem={items => (
          <ImageComponent
            flag={items.item.flag}
            path={items.item.path}
            onPress={props.onPress}
          />
        )}
        numColumns={columNum}
        key={columNum}
        keyExtractor={(item, index) => item.path}
        style={{marginHorizontal: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
});

export default screen;
