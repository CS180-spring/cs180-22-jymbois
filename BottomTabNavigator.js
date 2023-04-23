import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CalenderScreen from './screens/CalenderScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/SettingsScreen';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: 'tan', height: 80, size: 30 },
      headerStyle: { backgroundColor: 'tan' },
      headerTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: '#8B3A3A',
      tabBarActiveBackgroundColor: '#FFFF99' // debating on whether to keep this or not

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
        component={ProgressScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name='setting' color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;