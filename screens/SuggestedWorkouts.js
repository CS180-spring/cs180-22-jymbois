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
	Image,
} from "react-native";
import axios from "axios";
import { fetchExercises } from "../Util/exerciseAPI";
import { SearchBar } from "react-native-elements";
const SuggestedWorkouts = ({ visible, onClose }) => {
	const [workouts, setWorkouts] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (visible) {
			fetchExercises().then((data) => {
				setWorkouts(data);
			});
		}
	}, [visible]);
	const filteredWorkouts = workouts.filter((workout) =>
		workout.name.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.title}>Suggested Workouts</Text>
					{/* <TextInput
						style={styles.searchInput}
						onChangeText={(text) => setSearch(text)}
						value={search}
						placeholder="Search workouts"
					/> */}

					<SearchBar
						round
						searchIcon={{ size: 24 }}
						onChangeText={(text) => setSearch(text)}
						value={search}
						placeholder="Search workouts"
						placeholderTextColor="gray"
						containerStyle={styles.searchBarContainer}
						inputContainerStyle={styles.searchBarInputContainer}
						inputStyle={styles.searchBarInput}
					/>
					<FlatList
						data={filteredWorkouts}
						renderItem={({ item }) => (
							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>{item.name}</Text>
									<Text style={styles.workoutSubtitle2}>{item.target}</Text>
									<Text style={styles.workoutSubtitle3}>{item.equipment}</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image style={styles.image3} source={{ uri: item.gifUrl }} />
								</View>
							</View>
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
		width: 400,
		height: 820,
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

	workoutPosts: {
		marginTop: 10,

		left: -1,

		flex: 1,
		flexDirection: "row",

		padding: 16,
		borderRadius: 10,
		width: 370,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		minHeight: 110,
		alignSelf: "center",
		marginBottom: 30, // Add margin bottom
	},
	workoutLeftContent: {
		flexDirection: "column",
		flex: 1,
		left: 15,
		position: "absolute",
	},

	workoutSubtitle: {
		fontSize: 15,
		fontWeight: "bold",
		top: 15,
	},
	workoutSubtitle2: {
		fontSize: 13,
		fontWeight: "bold",
		color: "grey",
		marginTop: 25,
	},
	workoutSubtitle3: {
		fontSize: 13,
		fontWeight: "bold",
		color: "grey",
		marginTop: 15,
	},
	workoutRightContent: {
		flex: 1,
		position: "absolute",
		right: 10,
	},
	image3: {
		width: 110,
		height: 65,
		marginRight: 58,
		position: "absolute",
		right: 0,
		top: 35,

		borderRadius: 7,
		// borderWidth: 0.5,
		// borderColor: "#013220",
	},

	searchBarContainer: {
		backgroundColor: "transparent",
		borderBottomColor: "transparent",
		borderTopColor: "transparent",
		width: "100%",
	},
	searchBarInputContainer: {
		backgroundColor: "white",
	},
	searchBarInput: {
		color: "black",
	},
});

export default SuggestedWorkouts;
