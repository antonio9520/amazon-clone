import React from 'react';
import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {Picker} from '@react-native-picker/picker';
import {QuantitySelector, Button, ImageCarousel} from '../../components';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

const ProductScreen = () => {
  const [product, setProduct] = React.useState<Product | undefined>(undefined);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null,
  );
  const [quantity, setQuantity] = React.useState(1);
  const route = useRoute();
  const navigation = useNavigation();

  const onAddToCart = async () => {
    // const userData = await Auth.currentAuthenticatedUser();
    // if (!product || !userData) {
    //   return;
    // }

    // const newCartProduct = new CartProduct({
    //   userSub: userData.attributes.sub,
    //   quantity,
    //   option: selectedOption || undefined,
    //   productID: product.id,
    // });

    // await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart' as never);
  };

  React.useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  React.useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      <ImageCarousel images={product.images} />
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>
      <Text style={styles.price}>
        from $ {product.price.toFixed(2)}
        {product?.oldPrice && (
          <Text style={styles.oldPrice}>$ {product?.oldPrice.toFixed(2)}</Text>
        )}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button
        text="Add To Cart"
        onPress={onAddToCart}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button text="Buy Now" onPress={() => console.warn('buy now')} />
    </ScrollView>
  );
};

export default ProductScreen;
