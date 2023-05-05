import React, { useState } from 'react';
import { Picker } from "@react-native-picker/picker";
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

  const weightOptions = [];
  for (let i = 0; i <= 400; i += 1) {
    weightOptions.push(<Picker.Item key={i} label={`${i} lbs`} value={i.toString()} />)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.question}>What is your current weight today?</Text>
      <View style={styles.weightContainer}>
        <View style={styles.circle}>
          <Text style={styles.weightText}>{weight} lbs</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={weight}
            onValueChange={handleWeightChange}
            style={styles.picker}
          >
            {weightOptions}
          </Picker>
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
  picker: {
		width: "70%",
		height: 150,
	},
	selectedWeightText: {
		marginTop: 70,
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
	},
  question: {
    fontSize: 30,
		fontWeight: "bold",
		color: "black",
    marginBottom: 50,
		marginTop: -100,
    textAlign : "center",
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
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
    height: 50,
    paddingLeft: 20,
    textAlign: 'center',
    
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
    marginBottom: 10,
    color: "white",
	},
  announcement:{
    fontWeight: "bold",
    color: "blue",
    marginTop:20,
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
  pickerContainer: {
    flex: 1,
    height: undefined,
    maxHeight: 100,
  },
  picker: {
    width: 200,
    height: undefined,
    flex:'row',
  },
});

export default ProgressScreen
