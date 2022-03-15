import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {QuantitySelector} from '../../components';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const {item, quantity: QuantityProp} = cartItem;
  const [quantity, setQuantity] = React.useState(QuantityProp);
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.rigthContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.ratingContainer}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                key={`${item.id}-${i}`}
                style={styles.star}
                name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18}
                color="#e47911"
              />
            ))}
            <Text>{item.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from $ {item.price}
            {item.oldPrice && (
              <Text style={styles.oldPrice}>$ {item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </View>
    </View>
  );
};

export default CartProductItem;
