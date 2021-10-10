import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, FlatList} from 'react-native';
import BookSkipComponent from '../components/bookSkip/bookShikMainComponent';
import dataArr from '../Functions/bookSkip/dataArray';
import FlatlistItem from '../components/bookSkip/bookSkipMenuComponent';

const screen = () => {
  const [menuArray, setmenuArray] = useState(dataArr);
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <BookSkipComponent />
      <FlatList
        nestedScrollEnabled
        data={menuArray}
        renderItem={items => (
          <FlatlistItem
            image={items.item.image}
            name={items.item.name}
            alert={items.item.alert}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyleContainer}
        keyExtractor={item => item.name}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  columnWrapperStyleContainer: {
    marginHorizontal: '1%',
    justifyContent: 'space-between',
    marginVertical: '2%',
  },
});

export default screen;
