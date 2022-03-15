import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  page: {padding: 10},
  root: {
    borderWidth: 1,
    borderColor: '#fefefe',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    height: 150,
    flex: 2,
    resizeMode: 'cover',
  },
  rigthContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    marginLeft: 5,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
  quantityContainer: {
    margin: 5,
  },
});
