import {
	View,
	Text,
	Image,
	StyleSheet,
	Switch,
	Button,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from "@expo/vector-icons";
import { useDark, usePushNotifications, useVacation } from "../hooks/useSwitch";
import { auth } from "../configuration/firebaseConfig";

import GenderScreen from "../screens/GenderScreen";
import AgeScreen from "../screens/AgeScreen";
import HeightScreen from "../screens/HeightScreen";
import WeightScreen from "../screens/WeightScreen";

const Stack = createStackNavigator();

const SettingScreen = () => {
	const [isDark, toggleDark] = useDark(false);
	const [isVacation, toggleVacation] = useVacation(false);
	const [isPushNotifications, togglePushNotifications] =
		usePushNotifications(false);
	// still need to do this for the username and for photo uploads

	function logOut()
	{
		console.log(auth.currentUser.email + " logged out...");
		auth.signOut();
	}

	const newUserStack = () => {
		return (
		  <Stack.Navigator>
			<Stack.Screen
				name="Gender"
				component={GenderScreen}
				options={{
				  headerTintColor: "#FFFF",
				}}
			  />
			  <Stack.Screen
				name="Age"
				component={AgeScreen}
				options={{
				  headerTintColor: "#FFFF",
				}}
			  />
			  <Stack.Screen
				name="Height"
				component={HeightScreen}
				options={{
				  headerTintColor: "#FFFF",
				}}
			  />
			  <Stack.Screen
				name="Weight"
				component={WeightScreen}
				options={{
				  headerTintColor: "#FFFF",
				}}
			  />
		  </Stack.Navigator>
		);
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("./images/default-profile.png")}
			/>
			<View style={styles.editIconContainer}>
				<FontAwesome name="pencil" size={20} color="white" />
			</View>

			<Text style={{ fontSize: 20, marginTop: 20 }}>
				Welcome, <Text style={{ fontWeight: "bold" }}>User</Text>
			</Text>

			{[
				["Dark Mode", isDark, toggleDark],
				["Vacation Mode", isVacation, toggleVacation],
				["Push Notifications", isPushNotifications, togglePushNotifications],
			].map(([label, value, toggle]) => (
				<View key={label} style={styles.notificationContainer}>
					<Text style={styles.notificationText}>{label}</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#FFDB58" }}
						thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggle}
						value={value}
					/>
				</View>
			))}

			<TouchableOpacity style={styles.logout} onPress={logOut}>
				<Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
					LOG OUT
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.logout} onPress={newUserStack}>
				<Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
					SET PROFILE
				</Text>
			</TouchableOpacity>

			<Text style={{ marginTop: 30, marginBottom: 0, fontSize: 10 }}>
				POWERED BY
			</Text>
			<Image
				style={{ width: 120, height: 200, marginTop: -60 }}
				resizeMode="contain"
				source={require("./images/RealLogo.png")}
			/>
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 25,
	},
	image: {
		width: "34%",
		height: "21%",
		borderRadius: 70,
	},
	editIconContainer: {
		backgroundColor: "#8B3A3A",
		padding: 8,
		borderRadius: 50,
		marginTop: -20,
	},
	logout: {
		width: "70%",
		height: 50,
		backgroundColor: "#FFDB58",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 15,
		marginTop: 50,
	},
	notificationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: 45,
		paddingHorizontal: 70,
	},
	notificationText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
