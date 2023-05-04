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
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations
import database from "../configuration/firebaseConfig";
import { ref, set } from "firebase/database"

const WeightScreen = ({route}) => {
	const [weight, setWeight] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const {email, username, pw, gender, age, height} = route.params

	const handleWeightInput = (selectedWeight) => {
		setWeight(selectedWeight);
		setButtonDisabled(false);
	};

	const handleNextPress = async () => {
		if (weight !== "") {
		  console.log("Next button pressed. Weight:", weight);
		  try {
			const userCredential = await auth.createUserWithEmailAndPassword(email, pw); // Sign in
			const user = userCredential.user;
			dbRef = ref(database, 'users/' + user.uid + '/email'); // Reference to email section of user
			await set(dbRef, email);
			dbRef = ref(database, 'users/' + user.uid + '/uname');
			await set(dbRef, username);
			dbRef = ref(database, 'users/' + user.uid + '/password'); // Reference to password section (Maybe we should hash this?)
			await set(dbRef, pw);
			dbRef = ref(database, 'users/' + user.uid + '/gender');
			await set(dbRef, gender);
			dbRef = ref(database, 'users/' + user.uid + '/age');
			await set(dbRef, age);
			dbRef = ref(database, 'users/' + user.uid + '/height');
			await set(dbRef, height);
			dbRef = ref(database, 'users/' + user.uid + '/weight');
			await set(dbRef, weight);
			console.log(user.email + " logged in!");
		  } catch (error) {
			console.log(error);
		  }
		} else {
		  console.log("Please select a weight.");
		}
	  };
	  
	const [sliderValue, setSliderValue] = useState(0);

	const weights = [];
		for (let i = 0; i <= 300; i++) {
  			weights.push({ id: i.toString(), weight: i.toString() });
	}


	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.weightButton}
			onPress={() => handleWeightInput(item.weight)}
		>
			<Text style={styles.weightText}>{item.weight} </Text>
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
		//justifyContent: "top",
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
		justifyContent: "space-between",
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

export default WeightScreen
