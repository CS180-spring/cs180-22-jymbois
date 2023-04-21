import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";

const LoginScreen = ({ onPressLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<Text>Username:</Text>
			<TextInput
				placeholder="Enter Username"
				value={username}
				onChangeText={(text) => setUsername(text)}
			/>
			<Text>Password:</Text>
			<TextInput
				placeholder="Enter password"
				secureTextEntry
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<Button title="Login" onPress={() => onPressLogin(email, password)} />
		</View>
	);
};

export default LoginScreen;
