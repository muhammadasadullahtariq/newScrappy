import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {NumberOfColumn} from '../menuScreenComponent/calculateWidth';
import ImageComponent from './VideoOrImageUI';

const screen = () => {
  const [columNum, setColumnNum] = useState(3);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  useEffect(() => {
    setColumnNum(() => NumberOfColumn(windowWidth));
  }, [windowWidth]);
  Dimensions.addEventListener('change', () => {
    setWindowWidth(() => Dimensions.get('window').width);
  });
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={props.Array}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => (
          <ImageComponent path={items.item.path} flag={items.item.path} />
        )}
        numColumns={columNum}
        key={columNum}
        keyExtractor={(item, index) => +item.path}
      />
    </View>
  );
};

const styles = StyleSheet.create({mainContainer: {marginVertical: 10}});

export default screen;
