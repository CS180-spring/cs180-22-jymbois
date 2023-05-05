import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GenderScreen = () => {
	const navigation = useNavigation();
	const [gender, setGender] = useState(null);
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	const handleGenderSelection = (selectedGender) => {
		setGender(selectedGender);
		setIsButtonEnabled(true);
	};

	const handleNextButtonPress = () => {
		if (gender) {
			navigation.navigate("Age");
		} else {
			// Show error message
			alert("Please select a gender to proceed");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.subheading}>Please select your gender:</Text>
			<View style={styles.genderContainer}>
				<View style={styles.imageWrapper}>
					<TouchableOpacity onPress={() => handleGenderSelection("Male")}>
						<Image
							style={styles.genderImageM}
							source={require("./images/male.png")}
						/>
						<Text style={styles.genderText}>Male</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleGenderSelection("Female")}>
						<Image
							style={styles.genderImageF}
							source={require("./images/female.png")}
						/>
						<Text style={styles.genderText}>Female</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.imageWrapper2}>
					<TouchableOpacity
						onPress={() => handleGenderSelection("Prefer Not To Say")}
					>
						<Image
							style={styles.genderImage}
							source={require("./images/other.png")}
						/>
						<Text style={styles.genderText}>Other</Text>
					</TouchableOpacity>
				</View>
			</View>
			{gender && (
				<Text style={styles.selectedGenderText}>You selected: {gender}</Text>
			)}
			<TouchableOpacity
				style={isButtonEnabled ? styles.nextButton : styles.disabledNextButton}
				onPress={handleNextButtonPress}
				disabled={!isButtonEnabled}
			>
				<Text style={styles.nextButtonText}>Next</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},

	subheading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "grey",
		textAlign: "center",
		color: "black",
		marginBottom: 30,
	},
	genderContainer: {
		alignItems: "center",
		width: "100%",
		marginTop: 30,
		marginBottom: 50,
	},
	imageWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		paddingBottom: 10,
		paddingHorizontal: 30,
	},
	imageWrapper2: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingBottom: 10,
		paddingHorizontal: 30,
	},
	genderImageM: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 3,
		borderColor: "#8BC34A",
	},
	genderImageF: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 3,
		borderColor: "#8BC34A",
	},
	genderImage: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 3,
		borderColor: "#8BC34A",
	},

	genderText: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "black",
		marginTop: 10,
	},
	selectedGenderText: {
		fontSize: 18,
		marginTop: 20,
		marginBottom: 10,
		color: "black#8BC34A",
	},
	nextButton: {
		width: "40%",
		height: 50,
		backgroundColor: "white",
		justifyContent: "center",
		borderRadius: 25,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		borderColor: "#8BC34A",
		borderWidth: 1,
	},
	disabledNextButton: {
		width: "40%",
		height: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		borderRadius: 25,
		marginBottom: 15,
	},
	nextButtonText: {
		color: "black",
		fontSize: 25,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default GenderScreen;
