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

const ProgressScreen = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleWeightChange = (text) => {
    setWeight(text);
    setButtonDisabled(false);
  };

  const handleNextPress = () => {
    console.log("Next button pressed. Weight in pounds:", weight);
    navigation.navigate('Graph', { weight: weight });

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.question}>What is your current weight today?</Text>
        <Text style={styles.weightText}>{weight} lbs</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
          placeholder="Enter your weight in pounds"
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, buttonDisabled ? styles.disabled : styles.enabled]}
        onPress={handleNextPress}
        disabled={buttonDisabled}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.announcement}>We need this page to make sure they input their weight, Howie justin just make it look better plz thanks  ~xoxo</Text>
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
		marginBottom: 100,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    marginBottom: 30,
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2
  },
  input: {
    fontSize: 20,
    height: 50,
    paddingLeft: 20,
    
  },
  button: {
    width: "50%",
		height: 50,
		backgroundColor: "blue",
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
  weightText: {
		fontSize: 50,
		fontWeight: "bold",
		justifyContent: "space-between",
    marginBottom:30,
	},
  announcement:{
    fontWeight: "bold",
    color: "blue",
    marginTop:20,
  }
});

export default ProgressScreen
