import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GenderScreen from "./screens/GenderScreen";
import AgeScreen from "./screens/AgeScreen";
import HeightScreen from "./screens/HeightScreen";
import WeightScreen from "./screens/WeightScreen";
//import GraphScreen from "./screens/GraphScreen";
import PageDots from "./screens/PageDots";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const user = true; // placeholder for when we actually implement login
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "white" },
			}}
		>
				<>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerTintColor: "grey",
						}}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{
							headerTintColor: "grey",
						}}
					/>
					<Stack.Screen
						name="Gender"
						component={GenderScreen}
						options={{
							headerTintColor: "#grey",
						}}
					/>
					<Stack.Screen
						name="Age"
						component={AgeScreen}
						options={{
							headerTintColor: "grey",
						}}
					/>
					<Stack.Screen
						name="Height"
						component={HeightScreen}
						options={{
							headerTintColor: "grey",
						}}
					/>
					<Stack.Screen
						name="Weight"
						component={WeightScreen}
						options={{
							headerTintColor: "grey",
						}}
					/>
				</>
		</Stack.Navigator>
	);
};

export default StackNavigator;
