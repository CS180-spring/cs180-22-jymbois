import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GenderScreen = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setIsButtonEnabled(true);
  };

  const handleNextButtonPress = () => {
    if (gender) {
      navigation.navigate("Age");
    } else {
      // Show error message
      alert("Please select a gender to proceed");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What is your gender?</Text>
      <Text style={styles.subheading}>Pick one:</Text>
      <View style={styles.genderContainer}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => handleGenderSelection("Male")}>
            <Image style={styles.genderImageM} source={require("./images/male.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelection("Female")}>
            <Image style={styles.genderImageF} source={require("./images/female.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrapperBot}>
          <TouchableOpacity onPress={() => handleGenderSelection("Prefer Not To Say")}>
            <Image style={styles.genderImage} source={require("./images/other.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {gender && (
        <Text style={styles.selectedGenderText}>Selected gender: {gender}</Text>
      )}
      <TouchableOpacity
        style={isButtonEnabled ? styles.nextButton : styles.disabledNextButton}
        onPress={handleNextButtonPress}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    padding: 20,
  },
  heading: {
    fontSize:50,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    color: '#333',
    marginBottom: 5,
    marginTop:20,
    marginBottom: 20,
    color: "black",
  },
  subheading:{
    fontSize:20,
    fontWeight: "500",
    color: '#333',
    textAlign: 'left',
    color:"black",
    marginBottom: 15,
  },
  genderContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  imageWrapperBot:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  genderImage: {
    width: 150,
    height: 170,
  },
  genderImageM: {
    width: 150,
    height: 140,
  },
  genderImageF: {
    width: 170,
    height: 140,
  },
  selectedGenderText: {
    fontSize: 18,
    marginTop: 20,
    color: "tan",
  },
  nextButton: {
    backgroundColor: "tan",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  disabledNextButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default GenderScreen;
