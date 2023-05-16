import React, { useState } from 'react';
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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useVacation } from '../hooks/useSwitch';
import ThemeContext from '../hooks/ThemeContext';
import { auth } from '../configuration/firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Countdown from './CustomCountDown';
import { usePushNotificationToggle } from "../hooks/usePushNotificationToggle";
import { usePushRegister } from "../hooks/usePushRegister";


const SettingScreen = () => {
	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	//const [isVacation, toggleVacation] = useVacation(false, navigation);
	const [isVacation, setIsVacation] = useState(false);
	const [isPushNotificationsEnabled, togglePushNotifications] = usePushNotificationToggle(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [countdownVisible, setCountdownVisible] = useState(false);
	const [totalDuration, setTotalDuration] = useState(0);
	const navigation = useNavigation();
	usePushRegister(isPushNotificationsEnabled);
  
	const handleVacationModeToggle = () => {
		if (!isVacation) {
		  setModalVisible(true);
		} else {
		  setIsVacation(!isVacation); 
		}
	  };
	
	  const handleCountdownFinish = () => {
		setCountdownVisible(false);
		setIsVacation(false);
		navigation.navigate('Home'); // Make sure to use the correct name of the profile screen in your app
	  };
  
	const handleContinue = () => {
		setIsVacation(true);
		setModalVisible(false);
		// Calculate total duration in seconds
		const durationInSeconds = days * 86400 + hours * 3600 + minutes * 60;
		setTotalDuration(durationInSeconds);
		setCountdownVisible(true);
	  };
	  
  
	const handleCancel = () => {
	  setModalVisible(false);
	};
  
	function logOut() {
	  console.log(auth.currentUser.email + " logged out...");
	  auth.signOut();
	}
	// const remainingSeconds = Math.floor((finishInstance - new Date().getTime()) / 1000);
  
	return (
		<View style={{flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff"}}>
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
		  ["Vacation Mode", isVacation, handleVacationModeToggle],
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
  
		<TouchableOpacity style={styles.logout} onPress={logOut}>
		  <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
			LOG OUT
		  </Text>


		</TouchableOpacity>
  
		<Text style={{ marginTop: 20, marginBottom: 0, fontSize: 10, color: isDarkMode ? "#fff" : "#000", }}>
		  POWERED BY
		</Text>
		<Image
		  style={{ width: 120, height: 200, marginTop: -65 }}
		  resizeMode="contain"
		  source={styles.logoImage.source}
		/>
	  </View>
<Modal
animationType="slide"
transparent={false}
visible={modalVisible}
onRequestClose={() => setModalVisible(false)}>
<View style={styles.modalContainer}>
  <Text style={styles.modalTitle}>How long are you going to be gone for?</Text>
  <View style={styles.pickersContainer}>
	<View style={styles.pickerWrapper}>
	  <Text style={styles.pickerLabel}>Days</Text>
	  <Picker
  		selectedValue={days}
  		style={styles.picker}
  		onValueChange={(itemValue) => setDays(itemValue)}
  		itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}>
  		{Array.from({ length: 101 }, (_, i) => (
    	<Picker.Item key={i} label={`${i} `} value={i} />
  	))}
	</Picker>

	</View>
	<View style={styles.pickerWrapper}>
	  <Text style={styles.pickerLabel}>Hours</Text>
	  
	  <Picker
		selectedValue={hours}
		style={styles.picker}
		onValueChange={(itemValue) => setHours(itemValue)}
		itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}>
		{Array.from({ length: 24 }, (_, i) => (
		  <Picker.Item key={i} label={`${i} `} value={i} />
		))}
	  </Picker>
	</View>
	<View style={styles.pickerWrapper}>
	  <Text style={styles.pickerLabel}>Minutes</Text>
	  <Picker
		selectedValue={minutes}
		style={styles.picker}
		onValueChange={(itemValue) => setMinutes(itemValue)}
		itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}>
		{Array.from({ length: 60 }, (_, i) => (
		  <Picker.Item key={i} label={`${i} `} value={i} />
		))}
	  </Picker>
	</View>
  </View>
  <View style={styles.modalButtons}>
	<TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
	  <Text style={styles.buttonText}>Continue</Text>
	</TouchableOpacity>
	<TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
	  <Text style={styles.buttonText}>Cancel</Text>
	</TouchableOpacity>
  </View>
</View>
</Modal>
<Modal
animationType="slide"
transparent={false}
visible={countdownVisible}
onRequestClose={() => setCountdownVisible(false)}>
<View style={styles.modalContainer2}>
  <Text style={styles.modalTitle2}>Hope you are Having Fun!          See you in ... </Text>
 
  <Countdown onFinish={handleCountdownFinish} seconds={totalDuration} isDarkMode={isDarkMode} />
  <TouchableOpacity style={styles.cancelCounter} onPress={handleCountdownFinish}>
  <Text style={styles.buttonText}> End Vacation </Text>
  </TouchableOpacity>
</View>
</Modal>
</ScrollView>
</View>
  );
};

export default SettingScreen;

const createThemedStyles = (isDarkMode) => {
const logoImage = isDarkMode
? require("./images/RealLogoWhite.png")
: require("./images/RealLogo.png");

return StyleSheet.create({
container: {
height: '100%',
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
welcome: {
  fontSize: 20,
  marginTop: 20,
  color: isDarkMode ? "#fff" : "#000",
},
user: {
  fontWeight: "bold",
  color: isDarkMode ? "#fff" : "#000",
},
modalContainer: { // change this if u want to change the background color of the whole countdown page
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: isDarkMode ? '#000' : '#fff', // or #fff6e5
},
modalContainer2: { // change this if u want to change the background color of the whole countdown page
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: isDarkMode ? '#003' : '#fff', // or #fff6e5
  },
modalTitle: {
  fontSize: 27,
  fontWeight: 'bold',
  marginTop: -100,
  marginBottom: 80,
  marginLeft: 15,
  color: isDarkMode ? '#fff' : '#000',
},
modalTitle2: {
	fontSize: 27,
	fontWeight: 'bold',
	marginBottom: 20,
	marginLeft: 20,
	color: isDarkMode ? '#fff' : '#000',
  },
pickersContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
},
pickerWrapper: {
  width: '33%',
  alignItems: 'center',
},
pickerLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: isDarkMode ? '#fff' : '#000',
  marginBottom: 5,
},
picker: {
  width: '100%',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
  marginBottom: 20,
},
continueButton: {
  backgroundColor: '#013220',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
cancelButton: {
  backgroundColor: '#999',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
cancelCounter: {
	backgroundColor: '#999',
	paddingVertical: 10,
	paddingHorizontal: 20,
	borderRadius: 5,
	marginTop: 20,
  },
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
countdown: {
  marginTop: 20,
},
});
};
