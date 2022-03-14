import React from 'react';
import {Text, ScrollView} from 'react-native';
import {styles} from './styles';
import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import {QuantitySelector, Button, ImageCarousel} from '../../components';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = React.useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = React.useState(1);

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>
      {/* image carousel**/}
      <ImageCarousel images={product.images} />
      {/* option selector**/}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>
      {/* price**/}
      <Text style={styles.price}>
        from $ {product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>$ {product.oldPrice}</Text>
        )}
      </Text>
      {/* description**/}
      <Text style={styles.description}>{product.description}</Text>
      {/* quantiti selector* */}

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* button* */}
      <Button
        text="Add To Cart"
        onPress={() => console.warn('add to cart')}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button text="Buy Now" onPress={() => console.warn('buy now')} />
    </ScrollView>
  );
};

export default ProductScreen;
