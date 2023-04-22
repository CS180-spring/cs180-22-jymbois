import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

	const navigation = useNavigation();
	const testDatabase = () => {
		const dbRef = ref(database, 'test');
		set(dbRef, 'Hello, World!');
	};

	return (
		<View>
			<Text>I am the HomeScreen</Text>
			<Button title="Go to Calender" onPress={() => navigation.navigate("Calender")} />
			<Button
				title="Test Database"
				onPress={testDatabase}
			/>
		</View>
	);
};

export default HomeScreen;





