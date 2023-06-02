import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Appearance, useColorScheme } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import CalenderScreen from "./screens/CalenderScreen";
import ProgressScreen from "./screens/ProgressScreen";
import SettingsScreen from "./screens/ProfileScreen";
import GraphScreen from "./screens/GraphScreen";

import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { auth } from "./configuration/firebaseConfig";

import ThemeContext from "./hooks/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#000" : "white",
          height: 80,
          size: 30,
        },
        headerStyle: {
          backgroundColor: isDarkMode ? "#000" : "white",
        },
        headerTintColor: isDarkMode ? "grey" : "grey",
        headerTitleStyle: {
          color: isDarkMode ? "white" : "grey",
        },
        tabBarInactiveTintColor: isDarkMode ? "grey" : "grey",
        tabBarActiveTintColor: isDarkMode ? "#013220" : "#013220",
        tabBarActiveBackgroundColor: isDarkMode ? "black" : "white",
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
        component={GraphScreen}
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
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
        initialParams={{ isDarkMode }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
