import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from '../../components';
import {Auth} from 'aws-amplify';

const MenuScreen = () => {
  const onLogout = () => {
    Auth.signOut();
  };
  return (
    <SafeAreaView>
      <Button text="Sign out" onPress={onLogout} />
    </SafeAreaView>
  );
};

export default MenuScreen;
