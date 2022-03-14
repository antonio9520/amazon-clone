import React from 'react';
import {View, FlatList} from 'react-native';
import {styles} from './styles';
import {ProductItem} from '../../components';
import products from '../../data/products';

const HomeScreen = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
