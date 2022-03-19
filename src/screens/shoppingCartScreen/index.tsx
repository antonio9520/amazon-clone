import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {CartProductItem, Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

const ShoopingCartScreen = () => {
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);

  const navigation = useNavigation();

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('address' as never);
  };

  React.useEffect(() => {
    const fetchCartProducts = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, cp =>
        cp.userSub('eq', userData.attributes.sub),
      ).then(setCartProducts);
    };
    fetchCartProducts();
  }, []);

  React.useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );
      setCartProducts(currentCartProduct =>
        currentCartProduct.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p?.id === cartProduct.productID),
        })),
      );
    };
    fetchProducts();
  }, [cartProducts]);

  React.useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cpt => {
              if (cpt.id !== msg.element.id) {
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, []);

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal {cartProducts.length}:
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                {'$' + totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ShoopingCartScreen;
