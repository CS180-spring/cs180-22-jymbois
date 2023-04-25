import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const WeightScreen = () => {
	const navigation = useNavigation();
	const [weight, setWeight] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const handleWeightInput = (selectedWeight) => {
		setWeight(selectedWeight);
		setButtonDisabled(false);
	};

	const handleNextPress = () => {
		if (weight !== "") {
			console.log("Next button pressed. Weight:", weight);
			navigation.navigate("Login");
			// Here you can write your code to push weight into Firebase database
		} else {
			console.log("Please select a weight.");
		}
	};

	const weights = [
		{ id: "1", weight: "10" },
		{ id: "2", weight: "20" },
		{ id: "3", weight: "30" },
		{ id: "4", weight: "40" },
		{ id: "5", weight: "50" },
		{ id: "6", weight: "60" },
		{ id: "7", weight: "70" },
		{ id: "8", weight: "80" },
		{ id: "9", weight: "90" },
		{ id: "10", weight: "100" },
	];

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.weightButton}
			onPress={() => handleWeightInput(item.weight)}
		>
			<Text style={styles.weightText}>{item.weight} lbs</Text>
		</TouchableOpacity>
	);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.scaleContainer}>
					<View style={styles.scale}>
						<View style={styles.handle}></View>
						<View style={styles.weightContainer}>
							<Text style={styles.weightText}>{weight}</Text>
							<Text style={styles.unitText}>lbs</Text>
						</View>
					</View>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Select Your Weight:</Text>
					<FlatList
						data={weights}
						horizontal
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.weightListContainer}
					/>
				</View>
				<TouchableOpacity
					style={[
						styles.button,
						buttonDisabled ? styles.disabled : styles.enabled,
					]}
					onPress={handleNextPress}
					disabled={buttonDisabled}
				>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "top",
		backgroundColor: "#fff9e6",
		paddingHorizontal: 30,
	},
	scaleContainer: {
		marginTop: 60,
		width: "100%",
		height: 300,
		alignItems: "center",
		justifyContent: "center",
	},
	scale: {
		width: "80%",
		height: "80%",
		backgroundColor: "tan",
		borderRadius: 150,
		borderWidth: 5,
		borderColor: "#E5E5E5",
		alignItems: "center",
		justifyContent: "center",
	},
	weightContainer: {
		width: "60%",
		height: "60%",
		backgroundColor: "#fff",
		borderRadius: 150,
		borderWidth: 5,
		borderColor: "#E5E5E5",
		alignItems: "center",
		justifyContent: "center",
	},
	weightText: {
		fontSize: 50,
		fontWeight: "bold",
	},
	unitText: {
		fontSize: 36,
		fontWeight: "bold",
		marginTop: -10,
	},
	inputContainer: {
		width: "100%",
		marginTop: 30,
	},
	inputLabel: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		color: "tan",
	},
	textInput: {
		width: "100%",
		height: 60,
		borderWidth: 2,
		borderColor: "#E5E5E5",
		borderRadius: 10,
		padding: 10,
		fontSize: 24,
	},
	button: {
		backgroundColor: "#d2b48c",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 30,
		marginTop: 50,
		opacity: 0.5,
	},
	enabled: {
		opacity: 1,
	},
	disabled: {
		opacity: 0.5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	handle: {
		position: "absolute",
		width: 30,
		height: 30,
		backgroundColor: "#d2b48c",
		borderRadius: 50,
		bottom: "50%",
		left: "50%",
		transform: [{ translateX: -15 }, { translateY: 50 }],
	},
	pickerContainer: {
		position: "absolute",
		top: "50%",
		left: 0,
		right: 0,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	picker: {
		flex: 1,
		width: "100%",
		height: "100%",
		marginHorizontal: 20,
	},
});

export default WeightScreen;
