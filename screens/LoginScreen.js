import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// TODO: Implement login logic
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{/* <Text style={styles.heading}>Login</Text> */}
				<TextInput
					style={styles.input}
					placeholder="Enter email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
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
	heading: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
		color: "#333",
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
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 3,
		backgroundColor: "#F5F5F5",
		borderRadius: 15,
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
