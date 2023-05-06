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
import ThemeContext from "../hooks/ThemeContext";

const createThemedStyles = (isDarkMode) => {
	return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    question: {
      fontSize: 30,
      fontWeight: "bold",
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 100,
    },
    inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      width: '80%',
      marginBottom: 30,
    },
    input: {
      fontSize: 20,
      height: 50,
      paddingLeft: 20,
    },
    button: {
      width: "70%",
      height: 50,
      backgroundColor: "#FFDB58",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginBottom: 5,
      marginTop: 50,
    },
    buttonText: {
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
    },
    enabled: {
      backgroundColor: "#FFDB58",
    },
    disabled: {
      backgroundColor: "gray",
    },
    weightText: {
      fontSize: 50,
      fontWeight: "bold",
      justifyContent: "space-between",
      marginBottom:30,
      color: isDarkMode ? '#fff' : '#000',
    },
    
});
};


const ProgressScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
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
    </View>
    </TouchableWithoutFeedback>
  );
};



export default ProgressScreen
