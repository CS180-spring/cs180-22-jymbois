import {
	View,
	Text,
	Image,
	StyleSheet,
	Switch,
	TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { FontAwesome } from "@expo/vector-icons";
  import { usePushNotifications, useVacation } from "../hooks/useSwitch";
  import { createStackNavigator } from "@react-navigation/stack";
  import { auth } from "../configuration/firebaseConfig";
  import ThemeContext from "../hooks/ThemeContext";

const Stack = createStackNavigator();

const createThemedStyles = (isDarkMode) => {
	return StyleSheet.create({
	  container: {
		flex: 1,
		alignItems: "center",
		//marginTop: 25,
		backgroundColor: isDarkMode ? '#000' : '#fff',
	  },
	  image: {
		width: "34%",
		height: "21%",
		borderRadius: 70,
		marginTop: 35,
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
		marginBottom: 5,
		marginTop: 25,
	  },
	  notificationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: 25,
		paddingHorizontal: 70,
	  },
	  notificationText: {
		fontSize: 18,
		fontWeight: "bold",
		color: isDarkMode ? '#fff' : '#000',
	  },
	});
  };
  const SettingScreen = () => {
	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const [isVacation, toggleVacation] = useVacation(false);
	const [isPushNotifications, togglePushNotifications] = usePushNotifications(false);
	function logOut() {
		console.log(auth.currentUser.email + " logged out...");
		auth.signOut();
	}

	return (
	  <View style={styles.container}>
		<Image
		  style={styles.image}
		  source={require("./images/default-profile.png")}
		/>
		<View style={styles.editIconContainer}>
		  <FontAwesome name="pencil" size={20} color="white" />
		</View>
  
		<Text style={{ fontSize: 20, marginTop: 20, color: isDarkMode ? '#fff' : '#000' }}>
		  Welcome, <Text style={{ fontWeight: "bold" }}>User</Text>
		</Text>
		<View style={styles.notificationContainer}>
		</View>
  
		{[
		   ["Dark Mode", isDarkMode, toggleTheme],
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
  
		<TouchableOpacity style={styles.logout}>
		  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
			LOG OUT
		  </Text>
		</TouchableOpacity>
  
		<Text style={{ marginTop: 30, marginBottom: 0, fontSize: 10, color: isDarkMode ? '#fff' : '#000' }}>
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


