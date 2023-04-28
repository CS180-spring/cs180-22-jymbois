import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Dimensions,
	FlatList,
	Image,
} from "react-native";
import React from "react";
import { Button } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Image
					source={require("./images/profileHome.png")}
					style={styles.image}
				/>
				<View style={[styles.smallContentTitle]}>
					<Text style={styles.title}>Welcome Back</Text>
					<Text style={styles.subtitle2}>Check Where You Left Off</Text>
				</View>
			</View>
			<View style={styles.contentContainer}>
				<View style={[styles.leftContent]}>
					<Text style={styles.subtitle}>Finished:</Text>
					<Text style={styles.workoutsDone}>5 </Text>
					<Text style={styles.workoutsText}>Workouts Completed </Text>
				</View>
				<View style={styles.rightContainer}>
					<View style={[styles.rightContent, { marginBottom: 16 }]}>
						<Text style={styles.subtitle}>Goal weight:</Text>
						<View style={[styles.smallContent]}>
							<Text style={styles.goalWeight}>140</Text>
							<Text style={styles.pounds}>lbs</Text>
						</View>
					</View>
					<View style={[styles.rightContent2, { marginTop: 16 }]}>
						<Text style={styles.subtitle}>Time Spent:</Text>

						<View style={[styles.smallContent]}>
							<Text style={styles.goalWeight}>60</Text>
							<Text style={styles.pounds}>Minutes</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.title2Container}></View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		height: "auto",
	},
	smallContent: {
		flex: 1,
		flexDirection: "row",
	},
	smallContentTitle: {
		flex: 1,
		flexDirection: "column",
	},
	pounds: {
		fontSize: 16,
		marginLeft: 8,
		marginTop: 2,
		color: "#CDCDCD",
	},

	titleContainer: {
		flex: 1,
		// justifyContent: "top",
		// alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		marginTop: 15,
	},
	title2Container: {
		flexDirection: "column",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginLeft: 15,
	},
	image: {
		width: 65,
		height: 65,
		marginRight: 10,
		position: "absolute",
		right: 0,
		borderRadius: 45,
		borderWidth: 2,
		borderColor: "#414375",
	},
	contentContainer: {
		flex: 4,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
		marginTop: -60,
	},
	leftContent: {
		flex: 1,
		padding: 16,
		borderRadius: 10,
		maxWidth: 140,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		height: 193,
		alignItems: "center",
		marginLeft: 10,
	},
	rightContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		marginRight: -20,
		marginBottom: "auto",
	},
	rightContent: {
		flex: 1,
		width: 170, // add maxWidth property
		padding: 16,
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 80,
		// alignItems: "center",
		marginTop: "auto",
	},
	rightContent2: {
		flex: 1,
		flexDirection: "column",
		width: 170, // add maxWidth property
		padding: 16,
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 80,
		// alignItems: "center",
		// marginBottom: 330,
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginBottom: 9,
	},
	subtitle2: {
		fontSize: 20,
		// fontWeight: "bold",
		color: "#4A4A4A",
		marginBottom: 10,
		marginLeft: 17,
		marginTop: 5,
	},
	listItem: {
		fontSize: 10,
		color: "#4A4A4A",
		marginVertical: 4,
	},
	goalWeight: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginTop: -2,
	},
	workoutsDone: {
		fontSize: 60,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginTop: 10,
	},
	workoutsText: {
		fontSize: 13,

		color: "#CDCDCD",
		marginTop: 8,
	},
});

export default HomeScreen;
