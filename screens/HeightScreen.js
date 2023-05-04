import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const HeightScreen = ({route}) => {
	const navigation = useNavigation();
	const [selectedFeet, setSelectedFeet] = useState(0);
	const [selectedInches, setSelectedInches] = useState(0);
	const [totalInches, setTotalInches] = useState(0);

	const {email, username, pw, gender, age} = route.params

	const handleFeetSelection = (feet) => {
		setSelectedFeet(feet);
		setTotalInches(feet * 12 + selectedInches);
	};

	const handleInchesSelection = (inches) => {
		setSelectedInches(inches);
		setTotalInches(selectedFeet * 12 + inches);
	};

	const handleNextPress = () => {
		console.log(age);
		console.log(totalInches)
		if (totalInches > 0) {
			console.log("Next button pressed. Height in inches:", totalInches);
			navigation.navigate("Weight", {
				email: email,
				username: username,
				pw: pw,
				gender: gender,
				age: age,
				height: totalInches
			});
			// totalInces good good
		} else {
			console.log("Please select a height.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>How tall are you?</Text>
			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={selectedFeet}
					onValueChange={handleFeetSelection}
					style={styles.picker}
				>
					{Array.from(Array(9), (_, i) => i).map((feet) => (
						<Picker.Item key={feet} label={`${feet} ft`} value={feet} />
					))}
				</Picker>
				<Picker
					selectedValue={selectedInches}
					onValueChange={handleInchesSelection}
					style={styles.picker}
				>
					{Array.from(Array(12), (_, i) => i).map((inches) => (
						<Picker.Item key={inches} label={`${inches} in`} value={inches} />
					))}
				</Picker>
			</View>
			{totalInches > 0 && (
				<Text style={styles.selectedHeightText}>
					You are {Math.floor(totalInches / 12)} feet {totalInches % 12} inches
					tall.
				</Text>
			)}
			<TouchableOpacity
				style={[
					styles.button,
					totalInches > 0 ? styles.enabled : styles.disabled,
				]}
				onPress={handleNextPress}
				disabled={totalInches === 0}
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
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	picker: {
		width: "40%",
		height: 150,
		marginHorizontal: 10,
	},
	selectedHeightText: {
		marginTop: 60,
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
		marginTop: 70,
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

export default HeightScreen;
