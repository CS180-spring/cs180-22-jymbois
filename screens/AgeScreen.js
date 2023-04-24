import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const AgeScreen = () => {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(18);

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleNextPress = () => {
    if (selectedAge > 0) {
      console.log("Next button pressed. Selected age:", selectedAge);
      navigation.navigate("Height");  
    } else {
      console.log("Please select an age.");
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Enter your age!</Text>
      <Picker
        selectedValue={selectedAge}
        onValueChange={handleAgeSelection}
        style={{ width: "100%" }}
      >
        {Array.from(Array(100), (_, i) => i).map((age) => (
          <Picker.Item key={age} label={age.toString()} value={age} />
        ))}
      </Picker>
      <Text style={styles.text}>You are age {selectedAge}.</Text>
      <TouchableOpacity
        style={[styles.button, selectedAge > 0 ? styles.enabled : styles.disabled]}
        onPress={handleNextPress}
        disabled={selectedAge === 0}
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
    justifyContent: "top",
    backgroundColor: "#fff",
  },
  welcome: {
    paddingTop: 50,
    fontSize:50,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    color: '#333',
    marginBottom: 5,
    marginTop:0,
    marginRight:50,
    color: "tan",
},
  text: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20,
  },
  button: {
    width: "50%",
	height: 50,
	backgroundColor: "#d2b48c",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: 25,
    marginBottom: 15,
  },
  enabled: {
    backgroundColor: "tan",
  },
  disabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "center",
  },
});

export default AgeScreen;
