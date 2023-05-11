import {
	View,
	Text,
	Image,
	StyleSheet,
	Switch,
	TouchableOpacity,
	ScrollView,
} from "react-native";
  import React from "react";
  import { FontAwesome } from "@expo/vector-icons";
  import { useVacation } from "../hooks/useSwitch";
  import ThemeContext from "../hooks/ThemeContext";
  import { auth } from "../configuration/firebaseConfig";
  import { usePushNotificationToggle } from "../hooks/usePushNotificationToggle";
  import { usePushRegister } from "../hooks/usePushRegister";
  
  const SettingScreen = () => {
	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const [isVacation, toggleVacation] = useVacation(false);
	const [isPushNotificationsEnabled, togglePushNotifications] = usePushNotificationToggle(false);
	const expoPushToken = usePushRegister(isPushNotificationsEnabled);
  
	function logOut() {
	  console.log(auth.currentUser.email + " logged out...");
	  auth.signOut();
	}
  
	return (
  <ScrollView>
	  <View style={styles.container}>
		<Image
		  style={styles.image}
		  source={require("./images/default-profile.png")}
		/>
		<View style={styles.editIconContainer}>
		  <FontAwesome name="pencil" size={20} color="white" />
		</View>
  
		<Text style={styles.welcome}>
		  Welcome, <Text style={styles.user}>User</Text>
		</Text>
  
		{[
		  ["Dark Mode", isDarkMode, toggleTheme],
		  ["Vacation Mode", isVacation, toggleVacation],
		  ["Push Notifications", isPushNotificationsEnabled, togglePushNotifications],
		].map(([label, value, toggle]) => (
		  <View key={label} style={styles.notificationContainer}>
			<Text style={styles.notificationText}>{label}</Text>
			<Switch
			  trackColor={{ false: "#767577", true: "#013220" }}
			  thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
			  ios_backgroundColor="#3e3e3e"
			  onValueChange={toggle}
			  value={value}
			/>
		  </View>
   
		))}
  
		<TouchableOpacity style={styles.logout}>
		  <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
			LOG OUT
		  </Text>
		</TouchableOpacity>
  
		<Text style={{ marginTop: 20, marginBottom: 0, fontSize: 10 }}>
		  POWERED BY
		</Text>
		<Image
		  style={{ width: 120, height: 200, marginTop: -65 }}
		  resizeMode="contain"
		  source={styles.logoImage.source}
		/>
	  </View>
	  </ScrollView>
	  );
	};
	
	export default SettingScreen;


	const createThemedStyles = (isDarkMode) => {
		const logoImage = isDarkMode
		  ? require("./images/RealLogoWhite.png")
		  : require("./images/RealLogo.png");
	  
		return StyleSheet.create({
		  container: {
			flex: 1,
			alignItems: "center",
			backgroundColor: isDarkMode ? "#000" : "#fff",
		  },
		  image: {
			width: "34%",
			height: "21%",
			borderRadius: 70,
			marginTop: 35,
		  },
		  editIconContainer: {
			backgroundColor: "#013220",
			padding: 8,
			borderRadius: 50,
			marginTop: -20,
		  },
		  logout: {
			width: "70%",
			height: 50,
			backgroundColor: "#013220",
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
			color: isDarkMode ? "#fff" : "#000",
		  },
		  logoImage: {
			width: 120,
			height: 200,
			marginTop: -65,
			source: logoImage,
		  },
		  welcome:{
			fontSize: 20, 
			marginTop: 20,
			color: isDarkMode ? "#fff" : "#000",
		  },
		  user:{
			 fontWeight: "bold",
			 color: isDarkMode ? "#fff" : "#000",
		  }
	
		});
	  };

