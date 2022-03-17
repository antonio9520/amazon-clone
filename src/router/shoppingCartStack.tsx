import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ShoppingCartScreen, AddressScreen} from '../screens';

const Stack = createStackNavigator();
const ShoppingCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="cart"
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="address"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
