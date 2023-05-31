import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import StackNavigator from "./StackNavigator";
import { AuthProvider } from './hooks/useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import { auth } from './configuration/firebaseConfig';
import { ThemeProvider } from './hooks/ThemeContext'; 
import VerifyScreen from './screens/VerifyScreen';


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

      console.log("Signed In")
      //  If user has verified their email, they will get the normal stack
      if(auth.currentUser.emailVerified)
      {
        console.log("Verified")
        return (
          <ThemeProvider>
              <BottomTabNavigator/>
          </ThemeProvider>
        );
      }
      else
      {
        console.log("Not Verifed")
        //  Otherwise return a message saying the user must verify their pw
        return (<VerifyScreen/>)
      }
    }
}

export default LoginNavigator