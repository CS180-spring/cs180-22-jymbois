import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {

	const testDatabase = async () => {
		const dbRef = ref(database, 'Wowzers');
		await set(dbRef, 'Hello, World!');
		console.log('Data added to database!');
	  };

	return (
		<View>
			<Text>I am the HomeScreen</Text>
			<Button
				title="Test Database"
				onPress={testDatabase}
			/>
		</View>
	);
};

export default HomeScreen;





