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
	Dimensions,
} from "react-native";
import axios from "axios";
import { fetchExercises } from "../Util/exerciseAPI";
import { SearchBar } from "react-native-elements";
const SuggestedWorkouts = ({ visible, onClose }) => {
	const [workouts, setWorkouts] = useState([]);
	const [search, setSearch] = useState("");
	const screenWidth = Dimensions.get("window").width;
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
					<Text style={styles.title}>Workouts</Text>
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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: 370,
		height: 780,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		alignSelf: "left",
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
		flexDirection: "row",
		padding: 16,
		borderRadius: 10,
		width: 280, // Adjusted from fixed width to percentage of the screen width
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		minHeight: 80,
		alignSelf: "stretch", // This will make the item take up as much space as it can in the container
		marginBottom: 15,
		paddingVertical: 16,
		paddingHorizontal: 8, // adjust this as necessary
		alignSelf: "center",
	},

	workoutLeftContent: {
		// flexDirection: "column",
		// // flex: 1,
		// left: 15,
		// // position: "absolute",
		flexDirection: "column",
		flex: 1,
	},

	workoutSubtitle: {
		fontSize: 15,
		fontWeight: "bold",
		top: 2,
	},
	workoutSubtitle2: {
		fontSize: 13,
		fontWeight: "bold",
		color: "grey",
		marginTop: 18,
	},
	workoutSubtitle3: {
		fontSize: 13,
		fontWeight: "bold",
		color: "grey",
		marginTop: 15,
	},
	workoutRightContent: {
		// // flex: 1,
		// // position: "absolute",
		// right: 10,
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	image3: {
		width: 110,
		height: 65,
		marginRight: 10,
		position: "absolute",
		right: 0,
		top: 18,

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
		borderColor: "gray",
	},
});

export default SuggestedWorkouts;
