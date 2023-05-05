import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import StackNavigator from "./StackNavigator";
import { AuthProvider } from './hooks/useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import { auth } from './configuration/firebaseConfig';

const Stack = createNativeStackNavigator();

function LoginNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

    if(!user)
    {
        return(<StackNavigator/>)
    }
    else
    {
        return(<BottomTabNavigator/>)
    }
}

export default LoginNavigator