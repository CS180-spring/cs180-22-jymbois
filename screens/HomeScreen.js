import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Button } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {
	const [workouts, setWorkouts] = React.useState([
		"Jogging for 30 minutes",
		"20 push-ups",
		"10 squats",
	]);
	const numWorkouts = workouts.length;
	const containerHeight = numWorkouts * 24 + 32; // 24 is the height of each workout item, and 32 is the padding of the container

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Welcome Back</Text>
			</View>
			<View style={styles.contentContainer}>
				<View style={[styles.leftContent, { height: containerHeight }]}>
					<Text style={styles.subtitle}>Today's workouts:</Text>
					<ScrollView>
					{workouts.map((workout) => (
						<Text style={styles.listItem} key={workout}>
							- {workout}
						</Text>
					))}
					</ScrollView>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.rightContent}>
						<Text style={styles.subtitle}>Goal weight:</Text>
						<Text style={styles.goalWeight}>140 lbs</Text>
					</View>
					<View style={styles.rightContent2}>
						<Text style={styles.subtitle}>Time Spent:</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		height: 750,
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#4A4A4A",
	},
	contentContainer: {
		flex: 4,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	leftContent: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		maxWidth: 180,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 5,
		minHeight: 160,
	},
	rightContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		marginRight: -60,
	},
	rightContent: {
		flex: 1,
		maxWidth: 155, // add maxWidth property
		padding: 16,
		borderRadius: 8,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 73,
		alignItems: "center",
	},
	rightContent2: {
		flex: 1,
		flexDirection: "column",
		maxWidth: 155, // add maxWidth property
		padding: 16,
		borderRadius: 8,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 73,
		alignItems: "center",
		marginBottom: 416,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginBottom: 9,
	},
	listItem: {
		fontSize: 14,
		color: "#4A4A4A",
		marginVertical: 4,
	},
	goalWeight: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginTop: -2,
	},
});

export default HomeScreen;
