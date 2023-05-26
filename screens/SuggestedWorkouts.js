// MyModal.js
import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	Button,
	StyleSheet,
	FlatList,
	TextInput,
} from "react-native";
import axios from "axios";

const SuggestedWorkouts = ({ visible, onClose }) => {
	const [workouts, setWorkouts] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (visible) {
			const options = {
				method: "GET",
				url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
				headers: {
					"X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
					"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
				},
			};

			axios
				.request(options)
				.then((response) => {
					setWorkouts(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [visible]);

	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.title}>Suggested Workouts</Text>
					<TextInput
						style={styles.searchInput}
						onChangeText={(text) => setSearch(text)}
						value={search}
						placeholder="Search workouts"
					/>
					<FlatList
						data={workouts}
						renderItem={({ item }) => (
							<Text style={styles.workoutItem}>{item.name}</Text>
						)}
						keyExtractor={(item) => item.id}
					/>
					<Button title="Close" onPress={onClose} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	searchInput: {
		width: "100%",
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		borderRadius: 10,
		paddingLeft: 10,
	},
	workoutItem: {
		fontSize: 18,
		marginBottom: 10,
	},
});

export default SuggestedWorkouts;
