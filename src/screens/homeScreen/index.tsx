import React from 'react';
import {View, FlatList} from 'react-native';
import {styles} from './styles';
import {ProductItem} from '../../components';
import {DataStore} from 'aws-amplify';
import {Product} from '../../models';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  console.log(searchValue);

  React.useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);

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
