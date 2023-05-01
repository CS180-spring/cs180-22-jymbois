import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Dimensions,
	useWindowDimensions,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Button, useNavigation } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {
	const workoutData = [
		{
			id: "1",
			name: "Push",
			routeName: "Workout1",
			image: require("./images/bench.png"),
		},
		{
			id: "2",
			name: "Pull",
			routeName: "Workout2",
			image: require("./images/deadlift.png"),
		},
		{
			id: "3",
			name: "Legs",
			routeName: "Workout3",
			image: require("./images/legs.png"),
		},
	];
	const colors = ["#FF6F61", "#6B5B95", "#88B04B"];
	const { width, height } = useWindowDimensions();
	const isSmallScreen = width < 375;
	const numColumns = isSmallScreen ? 1 : 3;
	const itemWidth = isSmallScreen ? width - 32 : (width - 64) / 3;
	const itemHeight = isSmallScreen ? itemWidth * 1.2 : itemWidth * 1.5;

	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			style={[
				styles.workoutContainer,
				{
					backgroundColor: colors[index],

					height: itemHeight,
				},
			]}
			onPress={() => navigation.navigate(item.routeName)}
		>
			<View style={[styles.leftContent2]}>
				<Text style={styles.subtitle3}>5-10 Exercises</Text>
				<Text style={styles.workoutName}>{item.name}</Text>
			</View>

			<Image source={item.image} style={styles.workoutImage} />
		</TouchableOpacity>
	);

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
			<View style={[styles.contentContainer, { height: itemHeight }]}>
				<View style={[styles.leftContent]}>
					<Text style={styles.subtitle}>Finished:</Text>
					<Text style={styles.workoutsDone}>5 </Text>
					<Text style={(styles.workoutsText, { height: itemHeight })}>
						Workouts Completed
					</Text>
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
			<View style={styles.flatListContainer}>
				<Text style={styles.title2}>Choose a Workout</Text>
				<FlatList
					horizontal
					data={workoutData}
					showsHorizontalScrollIndicator={false}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						paddingLeft: 160,
						paddingRight: 1,
						justifyContent: "space-evenly",
					}}
				/>
			</View>
			<View style={[styles.bottomContent, { height: itemHeight }]}>
				<Image source={require("./images/clap.png")} style={styles.image2} />
				<View style={[styles.bottomMiddle]}>
					<Text style={styles.subtitle4}>You got this!</Text>
					<Text style={styles.heading2}>Better than the average!</Text>
				</View>
			</View>

			{/* <View style={styles.title2Container}></View> */}
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
	bottomContent: {
		width: 350, // add maxWidth property
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
		maxHeight: 110,

		alignSelf: "center",
		position: "relative",
		marginBottom: 22,
	},
	bottomMiddle: {
		flexDirection: "column",
		left: 70,
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

		justifyContent: "flex-start",
		flexDirection: "row",
		marginTop: 15,
	},
	title2Container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title2: {
		alignSelf: "center",
		marginBottom: 9,
		// justifyContent: "center",
		// justifyContent: "top",
		fontSize: 23,
		fontWeight: "bold",
	},
	leftContent2: {
		flexDirection: "column",
		right: 115,
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
		borderColor: "#FFDB58",
	},
	image2: {
		width: 65,
		height: 65,

		position: "absolute",
		left: 0,
		top: 15,
	},
	contentContainer: {
		flex: 6.3,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
		// marginTop: -40,
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
	subtitle3: {
		fontSize: 15,
		// fontWeight: "bold",
		color: "#ffff",
		top: 35,
		fontFamily: "AppleSDGothicNeo-SemiBold",
	},
	subtitle4: {
		fontSize: 18,
		fontWeight: "bold",

		top: 2,
	},
	heading2: {
		fontFamily: "AppleSDGothicNeo-SemiBold",
		fontSize: 16,
		top: 10,
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
	flatListContainer: {
		marginTop: 320,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		width: "100%",
		alignSelf: "center",
	},
	workoutListContainer: {
		flexDirection: "row",
		// flexWrap: "wrap",
		// justifyContent: "space-between",
	},
	workoutContainer: {
		backgroundColor: "#FFFFFF",

		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		paddingVertical: 16,
		paddingHorizontal: 16,
		marginBottom: 20,
		width: "60%",
		paddingLeft: 140,

		justifyContent: "space-evenly",

		height: 170,
		borderRadius: 13,
	},

	workoutName: {
		fontSize: 23,
		fontWeight: "bold",
		color: "#ffff",
		position: "absolute",
		// top: 20,
		// left: 10,
	},
	workoutImage: {
		width: 80,
		height: 80,
		top: 5,
		right: -13,
	},
});

export default HomeScreen;
