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
	Modal,
	Picker,
} from "react-native";
import React, { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [showTimerModal, setShowTimerModal] = React.useState(false);
	const [mode, setMode] = React.useState("stopwatch"); // Add mode state variable
	const [timer, setTimer] = React.useState({ min: 0, sec: 0 });

	const [isActive, setIsActive] = React.useState(false);
	const [isPaused, setIsPaused] = React.useState(false);
	const [showButtons, setShowButtons] = React.useState(true); // Add showButtons state variable
	const [startButton, setStartButton] = React.useState("Start"); // Add startButton state variable
	const [selectedWorkout, setSelectedWorkout] = useState(null);
	const countRef = React.useRef(null);
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

	const startTimer = () => {
		setIsActive(true);
		setIsPaused(false);
		if (mode === "timer") {
			const duration = timer.min * 60 + timer.sec;
			const startTime = Date.now();
			countRef.current = setInterval(() => {
				const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
				const remainingTime = Math.max(duration - elapsedTime, 0);
				if (remainingTime === 0) {
					clearInterval(countRef.current);
					setIsActive(false);
					alert("Timer finished!");
				}
				const newMin = Math.floor(remainingTime / 60);
				const newSec = remainingTime % 60;
				setTimer({ min: newMin, sec: newSec });
			}, 1000);
		} else if (mode === "stopwatch") {
			// Execute stopwatch logic
			countRef.current = setInterval(() => {
				setTimer((timer) => {
					const newMin = timer.sec === 59 ? timer.min + 1 : timer.min;
					const newSec = timer.sec === 59 ? 0 : timer.sec + 1;
					return { min: newMin, sec: newSec };
				});
			}, 1000);
			setIsPaused(false); // reset isPaused to false when the stopwatch starts
		}
	};
	const pauseTimer = () => {
		clearInterval(countRef.current);
		setIsPaused(true);
		setIsActive(false);
	};
	const resetTimer = () => {
		clearInterval(countRef.current);
		setTimer({ min: 0, sec: 0 });
		setIsActive(false);
		setIsPaused(false);
	};

	const handleTimerChange = (value, type) => {
		if (type === "hour") {
			setTimer((timer) => {
				return { ...timer, hour: value };
			});
		} else if (type === "minute") {
			setTimer((timer) => {
				return { ...timer, minute: value };
			});
		} else if (type === "second") {
			setTimer((timer) => {
				return { ...timer, second: value };
			});
		}
	};

	const [buttonTitle, setButtonTitle] = useState("Stopwatch");
	const [buttonColor, setButtonColor] = useState("#9b59b6"); // purple

	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			style={[
				styles.workoutContainer,
				{
					backgroundColor: colors[index],

					height: itemHeight,
				},
			]}
			onPress={() => setSelectedWorkout(item.routeName)}
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
			<Modal
				visible={selectedWorkout === "Workout1"}
				animationType="slide"
				onRequestClose={() => setSelectedWorkout(null)}
			>
				<View style={styles.modalContainer1}>
					<Text style={styles.WorkoutTitle}>Workouts</Text>

					<View style={styles.workoutList}>
						{/* <View style={[styles.leftContent]}>
							<Text style={styles.subtitle}>Finished:</Text>
							<Text style={styles.workoutsDone}>5 </Text>
							<Text style={styles.workoutsText}>Workouts Completed</Text>
						</View> */}
						<View style={styles.workoutPosts}></View>
					</View>
					<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
						<Text style={styles.closeModalTextWorkout}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<Modal
				visible={selectedWorkout === "Workout2"}
				animationType="slide"
				onRequestClose={() => setSelectedWorkout(null)}
			>
				<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
					<Text style={styles.closeModalTextWorkout}>Close</Text>
				</TouchableOpacity>
			</Modal>

			<Modal
				visible={selectedWorkout === "Workout3"}
				animationType="slide"
				onRequestClose={() => setSelectedWorkout(null)}
			>
				<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
					<Text style={styles.closeModalTextWorkout}>Close</Text>
				</TouchableOpacity>
			</Modal>
			<Modal visible={showTimerModal} animationType="slide">
				<View style={styles.timerModal}>
					<View style={styles.timerContainer}>
						<View style={styles.timerCircle}>
							<Text style={styles.timerText}>
								{timer.min.toString().padStart(2, "0")}:
								{timer.sec.toString().padStart(2, "0")}
							</Text>
						</View>
					</View>

					{!isActive && !isPaused && (
						<TouchableOpacity onPress={startTimer}>
							<Text style={styles.startBtn}>Start</Text>
						</TouchableOpacity>
					)}
					{isActive && (
						<TouchableOpacity onPress={pauseTimer}>
							<Text style={styles.pauseBtn}>Pause</Text>
						</TouchableOpacity>
					)}
					{isActive && (
						<TouchableOpacity onPress={resetTimer}>
							<Text style={styles.resetBtn}>Reset</Text>
						</TouchableOpacity>
					)}
					{isPaused && (
						<TouchableOpacity onPress={startTimer}>
							<Text style={styles.startBtn}>Resume</Text>
						</TouchableOpacity>
					)}

					<TouchableOpacity onPress={() => setShowTimerModal(false)}>
						<Text style={styles.closeModalText}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>

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
			<TouchableOpacity
				style={[styles.bottomContent, { height: itemHeight }]}
				onPress={() => setShowTimerModal(true)}
			>
				<Image source={require("./images/timer.png")} style={styles.image2} />
				<View style={[styles.bottomMiddle]}>
					<Text style={styles.subtitle4}>Rest Timer</Text>
					<Text style={styles.heading2}>Click Here!</Text>
				</View>
			</TouchableOpacity>
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
		maxHeight: 80,

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
		// alignSelf: "center",
		marginBottom: 16,
		// justifyContent: "center",
		// justifyContent: "top",
		fontSize: 21,
		fontWeight: "bold",
		left: 20,
		flex: 1,
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
		borderColor: "#013220",
	},
	image2: {
		width: 58,
		height: 58,

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
		marginTop: 330,
		// alignItems: "center",
		// justifyContent: "center",
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
		width: "58%",
		paddingLeft: 140,

		justifyContent: "space-evenly",

		maxHeight: 140,
		borderRadius: 13,
	},

	workoutName: {
		fontSize: 20,
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
	timerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		padding: 20,
	},
	timerContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: 250,
		height: 250,
		borderRadius: 250 / 2,
		backgroundColor: "#E8E8E8",
	},
	timerCircle: {
		alignItems: "center",
		justifyContent: "center",
		width: 220,
		height: 220,
		borderRadius: 220 / 2,
		backgroundColor: "white",
		borderWidth: 2,
		borderColor: "#7F7F7F",
	},
	timerText: {
		fontSize: 48,
		fontWeight: "bold",
	},
	closeModalText: {
		fontSize: 16,
		color: "blue",
		bottom: -100,
		left: 0,
		marginBottom: 60,
	},
	startBtn: {
		backgroundColor: "#4CAF50",
		color: "white",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 20,
		fontSize: 24,
		fontWeight: "bold",
		margin: 16,
		shadowColor: "#4CAF50",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 4,
	},
	pauseBtn: {
		backgroundColor: "#FF9800",
		color: "white",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 20,
		fontSize: 24,
		fontWeight: "bold",
		margin: 16,
		shadowColor: "#FF9800",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 4,
	},
	resetBtn: {
		backgroundColor: "#F44336",
		color: "white",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 20,
		fontSize: 24,
		fontWeight: "bold",
		margin: 16,
		shadowColor: "#F44336",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 4,
	},
	timerModeButton: {
		color: "white",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 120 / 2,
		height: 120,
		width: 120,
		fontWeight: "bold",
		margin: 16,
		justifyContent: "center",
		alignItems: "center",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 4,
	},

	timerModeText: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	},
	timerControl: {
		marginTop: 32,
		flexDirection: "row",
		alignItems: "center",
	},

	timerControlButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginHorizontal: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	timerControlButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	modelContainer1: {
		flex: 1,
		height: 400,
		width: "100%",
		padding: 20,
		backgroundColor: "#fff",
	},
	WorkoutTitle: {
		fontWeight: "bold",
		top: 80,
		fontSize: 26,
		left: 10,
	},
	closeModalTextWorkout: {
		fontSize: 12,
		fontWeight: 700,
		top: 700,
		alignSelf: "center",
	},
	workoutList: {
		top: 120,
	},
});

export default HomeScreen;
