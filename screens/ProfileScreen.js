import {
	View,
	Text,
	Image,
	StyleSheet,
	Switch,
	TouchableOpacity,
	ScrollView,
	Modal,
	Button,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { FontAwesome } from "@expo/vector-icons";
  import { usePushNotifications, useVacation } from "../hooks/useSwitch";
  import ThemeContext from "../hooks/ThemeContext";
  import { auth } from "../configuration/firebaseConfig";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import CountDown from 'react-native-countdown-component';
import moment from 'moment';
  
  const ProfileScreen = () => {
	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const [isVacation, toggleVacation] = useVacation(false);
	const [isPushNotifications, togglePushNotifications] = usePushNotifications(
	  false
	);
  
	const [vacationModalVisible, setVacationModalVisible] = useState(false);
	const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
  
	const [countdown, setCountdown] = useState(null);
	const [timer, setTimer] = useState(null);
  
	useEffect(() => {
	  return () => {
		if (timer) {
		  clearInterval(timer);
		}
	  };
	}, [timer]);
  
	function onChange(event, selectedDate) {
	  const currentDate = selectedDate || date;
	  setShow(Platform.OS === "ios");
	  setDate(currentDate);
	}
  
	function showMode(currentMode) {
	  setShow(true);
	  setMode(currentMode);
	}
  
	function showDatepicker() {
	  showMode("date");
	}
  
	function showTimepicker() {
	  showMode("time");
	}
  
	function toggleVacationWrapper() {
	  toggleVacation();
	  setVacationModalVisible(true);
	}
  
	function logOut() {
	  console.log(auth.currentUser.email + " logged out...");
	  auth.signOut();
	}
  
	function calculateRemainingTime() {
	  const now = new Date();
	  const remainingTime = date.getTime() - now.getTime();
	  if (remainingTime > 0) {
		setCountdown(remainingTime);
	  } else {
		clearInterval(timer);
	  }
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
			["Vacation Mode", isVacation, toggleVacationWrapper],
			["Push Notifications", isPushNotifications, togglePushNotifications],
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
  

{countdown && (
  <Text style={styles.countdownText}>
	Time remaining: {Math.floor(countdown / 1000)} seconds
  </Text>
)}

<Modal
  animationType="slide"
  transparent={true}
  visible={vacationModalVisible}
  onRequestClose={() => {
	setVacationModalVisible(false);
  }}
>
  <View style={styles.centeredView}>
	<View style={styles.modalView}>
	  <Text style={styles.modalText}>Select date and time</Text>
	  <TouchableOpacity onPress={showDatepicker}>
		<Text style={styles.buttonText}>Select Date</Text>
	  </TouchableOpacity>
	  <TouchableOpacity onPress={showTimepicker}>
		<Text style={styles.buttonText}>Select Time</Text>
	  </TouchableOpacity>
	  {show && (
		<DateTimePicker
		  testID="dateTimePicker"
		  value={date}
		  mode={mode}
		  is24Hour={true}
		  display="default"
		  onChange={onChange}
		/>
	  )}
	  <Button
		title="Continue"
		onPress={() => {
		  setVacationModalVisible(false);
		  setConfirmationModalVisible(true);
		}}
	  />
	</View>
  </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={confirmationModalVisible}
  onRequestClose={() => {
	setConfirmationModalVisible(false);
  }}
>
  <View style={styles.centeredView}>
	<View style={styles.modalView}>
	  <Text style={styles.modalText}>
		Are you sure you want to continue?
	  </Text>
	  <Button
		title="Yes"
		onPress={() => {
		  setConfirmationModalVisible(false);
		  const newTimer = setInterval(calculateRemainingTime, 1000);
		  setTimer(newTimer);
		}}
	  />
	  <Button
		title="No"
		onPress={() => {
		  setConfirmationModalVisible(false);
		}}
	  />
	</View>
  </View>
</Modal>
</ScrollView>
);
};
		
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
				  },
		  
			  centeredView: {
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				marginTop: 22,
			  },
			  modalView: {
				margin: 20,
				backgroundColor: isDarkMode ? "#333" : "white",
				borderRadius: 20,
				padding: 35,
				alignItems: "center",
				shadowColor: "#000",
				shadowOffset: {
				  width: 0,
				  height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 4,
				elevation: 5,
			  },
			  modalText: {
				marginBottom: 15,
				textAlign: "center",
				color: isDarkMode ? "#fff" : "#000",
			  },
			  buttonText: {
				color: "#013220",
				fontSize: 16,
				marginBottom: 10,
			  },
			  countdownText: {
				fontSize: 18,
				fontWeight: "bold",
				color: isDarkMode ? "#fff" : "#000",
				marginTop: 20,
				marginBottom: 20,
			  },
			});
		  };
		  
		  export default ProfileScreen;