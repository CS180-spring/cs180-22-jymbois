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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProgressStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Graph" component={GraphScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'tan', height: 80, size: 30 },
        headerStyle: { backgroundColor: 'tan' },
        headerTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#8B3A3A',
        tabBarActiveBackgroundColor: '#f5dd4b'
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
        name="Stocks" 
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
