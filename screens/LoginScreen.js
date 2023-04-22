import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const handleEmailFocus = () => setIsEmailFocused(true);
	const handleEmailBlur = () => setIsEmailFocused(false);
	const handlePasswordFocus = () => setIsPasswordFocused(true);
	const handlePasswordBlur = () => setIsPasswordFocused(false);
	const handleLogin = () => {
		// TODO: Implement login logic
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{/* <Text st

				yle={styles.heading}>Login</Text> */}
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
						placeholder="Enter email"
						value={email}
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
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.registerButton}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={styles.registerButtonText}>Dont't have an account?</Text>
				</TouchableOpacity>
			</View>
		</View>
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
	heading: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		color: "#333",
	},
	input: {
		justifyContent: "center",
		width: "65%",
		height: 50,

		paddingHorizontal: 1,
		marginBottom: 18,

		fontSize: 16,
		borderBottomWidth: 2,
		borderBottomColor: "#ccc",
		marginRight: 44,
	},
	inputInactive: {
		borderBottomColor: "#ccc",
	},
	inputFocused: {
		borderBottomColor: "#286086",
	},

	button: {
		width: "35%",
		height: 50,
		backgroundColor: "#286086",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		marginBottom: 15,
	},
	buttonText: {
		color: "#fff",
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
		color: "#286086",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default LoginScreen;
