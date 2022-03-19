import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {QuantitySelector} from '../../components';
import {Product, CartProduct} from '../../models';
import {DataStore, Auth} from 'aws-amplify';

const CartProductItem = ({cartItem}: {cartItem: CartProduct}) => {
  const {product, ...cartProduct} = cartItem;

  const updateQuantity = async (newQuantity: number) => {
    const original = await DataStore.query(CartProduct, cartProduct.id);
    await DataStore.save(
      CartProduct.copyOf(original, updated => {
        updated.quantity = newQuantity;
      }),
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: product?.image,
          }}
        />
        <View style={styles.rigthContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {product?.title}
          </Text>
          <View style={styles.ratingContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${product?.id}-${i}`}
                style={styles.star}
                name={
                  i < Math.floor(product?.avgRating || 0) ? 'star' : 'star-o'
                }
                size={18}
                color="#e47911"
              />
            ))}
            <Text>{product?.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from $ {product?.price}
            {product?.oldPrice && (
              <Text style={styles.oldPrice}>$ {product?.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={cartProduct.quantity}
          setQuantity={updateQuantity}
        />
      </View>
    </View>
  );
};

export default CartProductItem;
