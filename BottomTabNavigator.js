import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CalenderScreen from './screens/CalenderScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/ProfileScreen';
import GraphScreen from './screens/GraphScreen';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { auth } from './configuration/firebaseConfig';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProgressStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Progress_" component={ProgressScreen} />
      <Stack.Screen name="Graph" component={GraphScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white', height: 80, size: 30 },
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'grey',
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#8BC34A',
        tabBarActiveBackgroundColor: 'white'
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalenderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="date" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name='user' color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
