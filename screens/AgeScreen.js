import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const AgeScreen = ({route}) => {
	const navigation = useNavigation();
	const [selectedAge, setSelectedAge] = useState(18);

	const {email, username, pw, gender} = route.params

	const handleAgeSelection = (age) => {
		setSelectedAge(age);
	};

	const handleNextPress = () => {

		console.log(selectedAge);
		if (selectedAge > 0) {
			console.log("Next button pressed. Selected age:", selectedAge);
			navigation.navigate("Height", {
				email: email,
				username: username,
				pw: pw,
				gender: gender,
				age: selectedAge
			});
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
		backgroundColor: "white",
	},
	header: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black",
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
		color: "black",
	},
	button: {
		width: "50%",
		height: 50,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginTop: 30,
		shadowColor: '#000',
  		shadowOffset: { width: 0, height: 2 },
  		shadowOpacity: 0.2,
  		shadowRadius: 2,
  		elevation: 2
	},
	disabledButton: { 
    width: "70%",
		height: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
	enabled: {
		backgroundColor: "white",
	},
	disabled: {
		backgroundColor: "gray",
	},
	buttonText: {
		color: "black",
		fontSize: 25,
		fontWeight: "bold",
	},
});

export default AgeScreen;
