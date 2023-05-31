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
import { auth, resetPassword } from "../configuration/firebaseConfig"; //	Firebase Operations
import { writeUserData, readData } from "../hooks/databaseQueries";;

const VerifyScreen = () => {
    return(
        <View style={styles.content}>
            <Text style={styles.buttonText}>Please Check your Inbox to Verify your account</Text>
        </View>
    );
}

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
	buttonText: {
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default VerifyScreen;