import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>I am the LoginScreen</Text>
      <Button title="Go to Calender" onPress={() => navigation.navigate('Register') }/>
    </View>
  );
};

export default LoginScreen