import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import CalenderScreen from './screens/CalenderScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const user = false; // placeholder for when we actually implement login 
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Calender" component={CalenderScreen} />
                </>
            ) : (
                <>
                <Stack.Screen name="LogIn" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                </>
                
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator
