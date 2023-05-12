import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard, 
} from 'react-native';
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.question}>What is your current weight today?</Text>
      <View style={styles.weightContainer}>
        <View style={styles.circle}>
          <Text style={styles.weightText}>{weight} lbs</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={handleWeightInput}
            keyboardType="numeric"
            placeholder="Enter weight in pounds"
            placeholderTextColor="#BDBDBD"
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, buttonDisabled ? styles.disabled : styles.enabled]}
        onPress={handleNextPress}
        disabled={buttonDisabled}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  question: {
    fontSize: 30,
		fontWeight: "bold",
		color: "black",
		marginBottom: 50,
		marginTop: -100,
    textAlign: "center",
    fontFamily: 'OpenSans-Regular',
  },
  weightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
	width: 200,
	height: 200,
	borderRadius: 100,
	backgroundColor: '#8BC34A',
	justifyContent: 'center',
	alignItems: 'center',
	overflow: 'hidden',
	marginBottom: 20,
  },
  
  weightText: {
	fontSize: 50,
	fontWeight: "bold",
    color: "white",
	},
	inputContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		width: 250,
		height: 50,
		marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
	  },
	  input: {
		fontSize: 20,
		height: '100%',
		paddingLeft: 10,
		textAlign: "center",
	  },
	  
  button: {
    width: "50%",
	  height: 50,
	  backgroundColor: "#B8860B",
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
  buttonText: {
    color: "black",
	fontSize: 25,
	fontWeight: "bold",
  },
  enabled: {
    backgroundColor: "white",
  },
  disabled: {
    opacity: 0,
  },

});

export default WeightScreen;
