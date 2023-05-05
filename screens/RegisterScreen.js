import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  
  const handleUserNameFocus = () => setIsUserNameFocused(true);
  const handleUserNameBlur = () => setIsUserNameFocused(false);
  const handleEmailFocus = () => setIsEmailFocused(true);
	const handleEmailBlur = () => setIsEmailFocused(false);
	const handlePasswordFocus = () => setIsPasswordFocused(true);
	const handlePasswordBlur = () => setIsPasswordFocused(false);
  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
	const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);


  const registerButton = () => {
    console.log("Username", username);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPasscode);

    //  Simple check to see if password matches confirmed password fields
    if(password === confirmPasscode)
    {
      //  Registers email and password in Firebase

      //  Pass args from one screen to another
      //  username, email passwd -> Gender Screen
      
      navigation.navigate('Gender', {
          email: email,
          username: username,
          pw: password
      });
    }else
      alert("Your password and confirmed password do not match!")
  };

  //making sure that everything is filed and that password matches
  const passwordMatch = password === confirmPasscode;
  //making sure nothing is empty
  const fieldsFilled =
    username.length > 0 && email.length > 0 && password.length > 0 && confirmPasscode.length > 0;

  const signUpDisabled = !passwordMatch || !fieldsFilled;
  //152 working
  const emailRegex = new RegExp('^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$');
  //will throw invalid if email is not valid 
  const handleEmailChange = (text) => { //this probably not needed because of firebase
    setEmail(text);
    if (!emailRegex.test(text)) {
      //setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.welcome}>You're almost a JYM BRO!</Text>
      <Text style={styles.subheading}>See you in the JYM!</Text>
      
      <View style={styles.inputContainer}>
         <Image source={require("./images/profilepic.jpeg")} style={styles.icon} />
             <TextInput
              style={[
                styles.input,
                isUserNameFocused || username
                  ? styles.inputFocused
                  : styles.inputInactive,
              ]}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              onFocus={handleUserNameFocus}
						  onBlur={handleUserNameBlur}
             />
      </View>

      <View style={styles.inputContainer}>
         <Image source={require("./images/email.png")} style={styles.icon} />
              <TextInput
              style={[
                styles.input,
                isEmailFocused || email
                  ? styles.inputFocused
                  : styles.inputInactive,
              ]}
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
              onFocus={handleEmailFocus}
						  onBlur={handleEmailBlur}
              />
      </View>
        
      <View style={styles.inputContainer}>
         <Image source={require("./images/passwordpic.png")} style={styles.icon} />  
              <TextInput
              style={[
                styles.input,
                isPasswordFocused || password
                  ? styles.inputFocused
                  : styles.inputInactive,
              ]}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              onFocus={handlePasswordFocus}
						  onBlur={handlePasswordBlur}
              />
      </View>

      <View style={styles.inputContainer}>
         <Image source={require("./images/passwordpic.png")} style={styles.icon} />
              <TextInput
              style={[
                styles.input,
                isConfirmPasswordFocused || confirmPasscode
                  ? styles.inputFocused
                  : styles.inputInactive,
              ]}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPasscode}
              onChangeText={(text) => setConfirmPasscode(text)}
              onFocus={handleConfirmPasswordFocus}
						  onBlur={handleConfirmPasswordBlur}
              />
      </View>
    
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        {passwordMatch ? null : (
          <Text style={styles.errorMessage}>
            Password mismatch, 5 push ups and try again
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, signUpDisabled && styles.disabledButton]}
          disabled={signUpDisabled} 
          onPress={registerButton}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <View View style={styles.footer}>
          <Text>
          By signing up you agree our 
          <Text style={{ color: 'black', fontWeight: 'bold' }}> Terms & Condition </Text> 
           and  
          <Text style={{ color: 'black', fontWeight: 'bold' }}> Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	
	input: {
		width: "70%",
		height: 50,
		borderWidth: 0,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 18,
		color: "#333",
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		
	},
	button: {
		width: "70%",
		height: 50,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
	},
  disabledButton: { 
    width: "70%",
		height: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
	
  welcome: {
		fontSize:25,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
    marginTop:0,
    marginRight:30,
	},
  subheading:{
    fontSize:20,
    fontWeight: "200",
    color: '#333',
    textAlign: 'left',
    marginBottom:50,
    marginTop:5,
    marginRight:170,
  }, 

  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },

  footer: {
    position: 'static',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  icon: {
		width: 35,
		height: 35,
		marginRight: 15,
		marginBottom: 14,
    
	},
  
  inputInactive: {
		borderBottomColor: "#ccc",
	},
	inputFocused: {
		borderBottomColor: "#8BC34A",
	},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

}
);

export default RegisterScreen