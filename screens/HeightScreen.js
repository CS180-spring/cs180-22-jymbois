import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const HeightScreen = () => {
  const [selectedFeet, setSelectedFeet] = useState(5);
  const [selectedInches, setSelectedInches] = useState(6);
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
      // Here you can write your code to push totalInches into Firebase database
    } else {
      console.log("Please select a height.");
    }
  };

  
  export default HeightScreen