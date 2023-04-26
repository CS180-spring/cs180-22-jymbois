import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const AgeScreen = () => {
	const navigation = useNavigation();
	const [selectedAge, setSelectedAge] = useState(18);

	const handleAgeSelection = (age) => {
		setSelectedAge(age);
	};

	const handleNextPress = () => {
		if (selectedAge > 0) {
			console.log("Next button pressed. Selected age:", selectedAge);
			navigation.navigate("Height");
		} else {
			console.log("Please select an age.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>How old are you?</Text>
			<Picker
				selectedValue={selectedAge}
				onValueChange={handleAgeSelection}
				style={styles.picker}
			>
				{Array.from(Array(100), (_, i) => i).map((age) => (
					<Picker.Item key={age} label={age.toString()} value={age} />
				))}
			</Picker>
			{selectedAge > 0 && (
				<Text style={styles.selectedAgeText}>
					You selected {selectedAge} years old.
				</Text>
			)}
			<TouchableOpacity
				style={[
					styles.button,
					selectedAge > 0 ? styles.enabled : styles.disabled,
				]}
				onPress={handleNextPress}
				disabled={selectedAge === 0}
			>
				<Text style={styles.buttonText}>Next</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF8DC",
	},
	header: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#B8860B",
		marginBottom: 20,
	},
	picker: {
		width: "70%",
		height: 150,
	},
	selectedAgeText: {
		marginTop: 70,
		fontSize: 20,
		fontWeight: "bold",
		color: "#B8860B",
	},
	button: {
		width: "50%",
		height: 50,
		backgroundColor: "#B8860B",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginTop: 30,
	},
	enabled: {
		backgroundColor: "#D2B48C",
	},
	disabled: {
		backgroundColor: "gray",
	},
	buttonText: {
		color: "white",
		fontSize: 25,
		fontWeight: "bold",
	},
});

export default AgeScreen;
