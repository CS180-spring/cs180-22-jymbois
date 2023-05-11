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
import ThemeContext from "../hooks/ThemeContext";

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

  const { isDarkMode } = React.useContext(ThemeContext);
  const styles = createThemedStyles(isDarkMode);

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
const createThemedStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff',
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
      textAlign : 'center',
      fontWeight: "bold",
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 100,
    },
    inputContainer: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: 10,
      width: '80%',
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    input: {
      fontSize: 20,
      height: 50,
      paddingLeft: 20,
      color: isDarkMode ? '#fff' : '#000',
    },
    button: {
      width: "50%",
      height: 50,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      marginTop: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    buttonText: {
      color: isDarkMode ? '#fff' : 'black',
      fontSize: 25,
      fontWeight: "bold",
    },
    enabled: {
      backgroundColor: isDarkMode ? '#013220' : 'white',
    },
    disabled: {
      backgroundColor: isDarkMode ? 'gray' : 'gray',
    },
    weightText: {
      fontSize: 50,
      fontWeight: "bold",
      justifyContent: "center",
      marginBottom:5,
      color: isDarkMode ? '#fff' : '#fff',
    },
    announcement:{
      fontWeight: "bold",
      color: isDarkMode ? '#fff' : 'blue',
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
};


export default ProgressScreen
