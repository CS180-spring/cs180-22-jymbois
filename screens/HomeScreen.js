import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
	const navigation = useNavigation();
	return (
		<View>
			<Text>I am the HomeScreen</Text>
			<Button
				title="Go to Calender"
				onPress={() => navigation.navigate("Calender")}
			/>
			<Button
				title="Go to Login"
				onPress={() => navigation.navigate("Login")}
			/>
		</View>
	);
};

export default HomeScreen;
