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

const WeightScreen = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleWeightChange = (text) => {
    setWeight(text);
    setButtonDisabled(false);
  };

  const handleNextPress = () => {
    console.log("Next button pressed. Weight in pounds:", weight);
    navigation.navigate('Login');

  };

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
            onChangeText={handleWeightChange}
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
	marginBottom: 30,
  borderWidth: 2,
  borderColor: 'black',
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
    backgroundColor: "gray",
  },

});

export default WeightScreen;
