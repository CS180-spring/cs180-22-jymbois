import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const HeightScreen = () => {
  const navigation = useNavigation();
  const [selectedFeet, setSelectedFeet] = useState(0);
  const [selectedInches, setSelectedInches] = useState(0);
  const [totalInches, setTotalInches] = useState(0);

  const handleFeetSelection = (feet) => {
    setSelectedFeet(feet);
    setTotalInches(feet * 12 + selectedInches);
  };

  const handleInchesSelection = (inches) => {
    setSelectedInches(inches);
    setTotalInches(selectedFeet * 12 + inches);
  };

  const handleNextPress = () => {
    if (totalInches > 0) {
      console.log("Next button pressed. Height in inches:", totalInches);
      navigation.navigate("Weight"); 
      // totalInces good good
    } else {
      console.log("Please select a height.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Enter your height!</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFeet}
          onValueChange={handleFeetSelection}
          style={styles.picker}
        >
          {Array.from(Array(9), (_, i) => i ).map((feet) => (
            <Picker.Item key={feet} label={`${feet} ft`} value={feet} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedInches}
          onValueChange={handleInchesSelection}
          style={styles.picker}
        >
          {Array.from(Array(12), (_, i) => i).map((inches) => (
            <Picker.Item key={inches} label={`${inches} in`} value={inches} />
          ))}
        </Picker>
      </View>
      <Text style={styles.text}>
        Your height is {totalInches} inches {Math.floor(totalInches / 12)}'{" "}
        {totalInches % 12}"{" "}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          totalInches > 0 ? styles.enabled : styles.disabled,
        ]}
        onPress={handleNextPress}
        disabled={totalInches === 0}
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
        marginTop: 60,
      },
    welcome: {
        fontSize:50,
        fontWeight: '500',
        fontFamily: 'Helvetica',
        color: '#333',
        marginBottom: 5,
        marginTop:0,
        marginRight:50,
        color: "tan",
    },
    pickerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    pickerLabel: {
      fontSize: 20,
      fontWeight: "bold",
      marginRight: 10,
    },
    picker: {
      width: "40%",
      height: 250,
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
    buttonText: {
        color: "white",
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: "center",
    },
    enabled: {
        backgroundColor: "tan",
      },
      disabled: {
        backgroundColor: "gray",
      },
    
  });
  

  export default HeightScreen