import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";	
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const [emailInputPosition, setEmailInputPosition] = useState({ x: 0, y: 0 });
	const [passwordInputPosition, setPasswordInputPosition] = useState({
		x: 0,
		y: 0,
	});

	const handleEmailLayout = (event) => {
		setEmailInputPosition({
			x: event.nativeEvent.layout.x,
			y: event.nativeEvent.layout.y,
		});
	};

	const handlePasswordLayout = (event) => {
		setPasswordInputPosition({
			x: event.nativeEvent.layout.x,
			y: event.nativeEvent.layout.y,
		});
	};

	const handleEmailFocus = () => {
		setIsEmailFocused(true);
		setTimeout(() => {
			scrollViewRef.current.scrollTo({
				x: 0,
				y: emailInputPosition.y - 100,
				animated: true,
			});
		}, 50);
	};

	const handleEmailBlur = () => setIsEmailFocused(false);

	const handlePasswordFocus = () => {
		setIsPasswordFocused(true);
		setTimeout(() => {
			scrollViewRef.current.scrollTo({
				x: 0,
				y: passwordInputPosition.y - 100,
				animated: true,
			});
		}, 50);
	};

	const handlePasswordBlur = () => setIsPasswordFocused(false);

	const handleLogin = () => {
		// Run login function here
		auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => { //  Successful sign in
            const user = userCredential.user;
            console.log("Logged in with: ", email);
			navigation.navigate("Home")	//	Navigate to User Home Page :)
          }).catch((error) => { //  Error, set to send alert when error occurs

			//	Maybe set up message here instead of just an alert window?
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
           })
	};

	const scrollViewRef = useRef(null);

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
			onScroll={() => Keyboard.dismiss()}
			ref={scrollViewRef}
			scrollEventThrottle={16}
		>
			<View style={styles.content}>
				<Image source={require("./images/RealLogo.png")} style={styles.logo} />
				<View style={styles.inputContainer}>
					<Image
						source={require("./images/profilepic.jpeg")}
						style={styles.icon}
					/>
					<TextInput
						style={[
							styles.input,
							isEmailFocused || email
								? styles.inputFocused
								: styles.inputInactive,
						]}
						placeholder="Enter Username"
						value={email}	//	email var set here trhough textbox
						onChangeText={setEmail}
						onFocus={handleEmailFocus}
						onBlur={handleEmailBlur}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Image
						source={require("./images/passwordpic.png")}
						style={styles.icon}
					/>
					<TextInput
						style={[
							styles.input,
							isPasswordFocused || password
								? styles.inputFocused
								: styles.inputInactive,
						]}
						placeholder="Enter password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						onFocus={handlePasswordFocus}
						onBlur={handlePasswordBlur}
					/>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={styles.registerButtonText}>Don't have an account? <Text style={{color: 'black', fontWeight: 'bold'}}>Click here</Text></Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
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
		padding: 20,
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
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 35,
		height: 35,
		marginRight: 15,
		marginBottom: 14,
	},
	logo: {
		width: 240,
		height: 240,
		marginTop: -190,
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		color: "white",
	},
	input: {
		justifyContent: "center",
		width: "65%",
		height: 50,

		paddingHorizontal: 1,
		marginBottom: 23,

		fontSize: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#ccc",
		marginRight: 44,
	},
	inputInactive: {
		borderBottomColor: "#ccc",
	},
	inputFocused: {
		borderBottomColor: "#8BC34A",
	},

	button: {
		width: "70%",
		height: 50,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
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
	registerButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	registerButtonText: {
		color: "black",
		fontSize: 16,
	},
});

export default LoginScreen;
