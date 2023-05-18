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
import React, { useState, useEffect } from 'react';
import { readData } from "../hooks/databaseQueries";
import { auth } from '../configuration/firebaseConfig';
import { MaterialIcons } from "@expo/vector-icons";
import ThemeContext from "../hooks/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";

const HomeScreen = () => {

	const [userId, setUserId] = useState(null);
 	const [currentWeight, setCurrentWeight] = useState('');


	 useEffect(() => {
   		const user = auth.currentUser;
    	if (user) {
      	setUserId(user.uid);
    	}
	}, []);


  	useEffect(() => {
    	const fetchData = async () => {
      	try {
        	const userData = await readData(`users/${userId}`);
        	setCurrentWeight(userData.weight);
      	} catch (error) {
        	console.error(error);
      	}
    	};


    	if (userId) {
      	fetchData();
    	}
  	}, [userId]);

	const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const navigation = useNavigation();
	const [showTimerModal, setShowTimerModal] = React.useState(false);
	const [mode, setMode] = React.useState("stopwatch"); // Add mode state variable
	const [timer, setTimer] = React.useState({ min: 0, sec: 0 });

	const [isActive, setIsActive] = React.useState(false);
	const [isPaused, setIsPaused] = React.useState(false);
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
						<ScrollView>
							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Bench</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>5-8 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/Larry-Wheels.png")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Incline Dumbells</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/incline.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Chest Flys</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/chestFlys.png")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Chest Flys</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/cbumDaddy.jpg")}
										style={styles.image3}
									/>
								</View>
							</View>
						</ScrollView>
					</View>

					<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
						<Text style={styles.closeModalTextWorkout}>X</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<Modal
				visible={selectedWorkout === "Workout2"}
				animationType="slide"
				onRequestClose={() => setSelectedWorkout(null)}
			>
				<View style={styles.modalContainer1}>
					<Text style={styles.WorkoutTitle}>Workouts</Text>

					<View style={styles.workoutList}>
						<ScrollView>
							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Barbell Rows</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>5-8 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/barbellRows.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Lat Pulldowns</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/latPulldown.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Pull Ups</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/pullUps.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Cable Rows</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/cableRows.jpg")}
										style={styles.image3}
									/>
								</View>
							</View>
						</ScrollView>
					</View>

					<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
						<Text style={styles.closeModalTextWorkout}>X</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<Modal
				visible={selectedWorkout === "Workout3"}
				animationType="slide"
				onRequestClose={() => setSelectedWorkout(null)}
			>
				<View style={styles.modalContainer1}>
					<Text style={styles.WorkoutTitle}>Workouts</Text>

					<View style={styles.workoutList}>
						<ScrollView>
							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Squat</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>5-8 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/squat.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Leg Press</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/legPress.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Leg Extensions</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/legExtension.jpeg")}
										style={styles.image3}
									/>
								</View>
							</View>

							<View style={styles.workoutPosts}>
								<View style={styles.workoutLeftContent}>
									<Text style={styles.workoutSubtitle}>Chest Flys</Text>
									<Text style={styles.workoutSubtitle2}>4 Sets</Text>
									<Text style={styles.workoutSubtitle3}>8-12 Reps</Text>
									<Text style={styles.workoutSubtitle4}>Goal: 15min</Text>
								</View>

								<View style={styles.workoutRightContent}>
									<Image
										source={require("./images/legCurls.jpg")}
										style={styles.image3}
									/>
								</View>
							</View>
						</ScrollView>
					</View>
					<TouchableOpacity onPress={() => setSelectedWorkout(null)}>
						<Text style={styles.closeModalTextWorkout}>X</Text>
					</TouchableOpacity>
				</View>
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
					<Text style={(styles.workoutText)}>
						Workouts Completed
					</Text>
				</View>
				<View style={styles.rightContainer}>
					<View style={[styles.rightContent, { marginBottom: 16 }]}>
						<Text style={styles.subtitle}>Current Weight:</Text>
						<View style={[styles.smallContent]}>
							<Text style={styles.goalWeight}>{currentWeight}</Text>
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

const createThemedStyles = (isDarkMode) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: isDarkMode ? "#000" : "#FFFFFF",
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
		backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
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
		color: isDarkMode ? "#CDCDCD" : "#000000",
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
		marginBottom: 16,
		fontSize: 21,
		fontWeight: "bold",
		left: 20,
		flex: 1,
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
	},
	leftContent2: {
		flexDirection: "column",
		right: 115,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
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

	image3: {
		width: 160,
		height: 116,
		marginRight: 4,
		position: "absolute",
		right: 0,
		top: 13,

		borderRadius: 7,
		borderWidth: 0.5,
		borderColor: "#013220",
	},
	contentContainer: {
		flex: 6.3,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	leftContent: {
		flex: 1,
		padding: 16,
		borderRadius: 10,
		maxWidth: 140,
		backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
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
		width: 170,
		padding: 16,
		borderRadius: 10,
		backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
		shadowColor: isDarkMode ? "#FFFFFF" : "#000",
		shadowOffset: {
		width: 2,
		height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 80,
		marginTop: "auto",
		},
	rightContent2: {
		flex: 1,
		flexDirection: "column",
		width: 170,
		padding: 16,
		borderRadius: 10,
		backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
		shadowColor: isDarkMode ? "#FFFFFF" : "#000",
		shadowOffset: {
		width: 2,
		height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		maxHeight: 80,
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "bold",
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		marginBottom: 9,
	},
	subtitle2: {
		fontSize: 20,
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		marginBottom: 10,
		marginLeft: 17,
		marginTop: 5,
	},
	subtitle3: {
		fontSize: 15,
		color: "#ffff",
		top: 35,
		fontFamily: "AppleSDGothicNeo-SemiBold",
	},
	subtitle4: {
		fontSize: 18,
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		fontWeight: "bold",
		top: 2,
	},
	heading2: {
		fontFamily: "AppleSDGothicNeo-SemiBold",
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		fontSize: 16,
		top: 10,
	},
	listItem: {
		fontSize: 10,
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		marginVertical: 4,
	},
	goalWeight: {
		fontSize: 20,
		fontWeight: "bold",
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		marginTop: -2,
	},

	workoutsDone: {
		fontSize: 60,
		fontWeight: "bold",
		color: isDarkMode ? "#FFFFFF" : "#4A4A4A",
		marginTop: 10,
	},
	workoutText: { //IDK WHYY THIS PART IS NOT TURNING WHITE
		fontSize: 16,
		//color: "red", // not even turning red so idk
		color: isDarkMode ? "#CDCDCD" : "#000000",
		marginTop: 9,
	},
	flatListContainer: {
		marginTop: 330,
		position: "absolute",
		width: "100%",
		alignSelf: "center",
	},
	workoutListContainer: {
		flexDirection: "row",
	},
	workoutContainer: {
		backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
		shadowColor: isDarkMode ? "#FFFFFF" : "#000",
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
        color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
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
        backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        padding: 20,
    },
    timerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        backgroundColor: isDarkMode ? "#222222" : "#E8E8E8",
    },
    timerCircle: {
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 220,
        borderRadius: 220 / 2,
        backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
        borderWidth: 2,
        borderColor: isDarkMode ? "#FFFFFF" : "#7F7F7F",
    },
    timerText: {
        fontSize: 48,
        fontWeight: "bold",
        color: isDarkMode ? "#FFFFFF" : "#000000",
    },
    closeModalText: {
        fontSize: 16,
        color: isDarkMode ? "#FFFFFF" : "blue",
        bottom: -100,
        left: 0,
        marginBottom: 60,
    },
    startBtn: {
        backgroundColor: isDarkMode ? "#008000" : "#4CAF50",
        color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 20,
        fontSize: 24,
        fontWeight: "bold",
        margin: 16,
        shadowColor: isDarkMode ? "#008000" : "#4CAF50",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
    pauseBtn: {
        backgroundColor: isDarkMode ? "#FFA500" : "#FF9800",
        color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 20,
        fontSize: 24,
        fontWeight: "bold",
        margin: 16,
        shadowColor: isDarkMode ? "#FFA500" : "#FF9800",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
    },
	resetBtn: {
		backgroundColor: isDarkMode ? "#f1707a" : "#F44336",
		color: isDarkMode ? "#000" : "white",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 20,
		fontSize: 24,
		fontWeight: "bold",
		margin: 16,
		shadowColor: isDarkMode ? "#f1707a" : "#F44336",
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
		backgroundColor: isDarkMode ? "#a5d6a7" : "#4CAF50",
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
		backgroundColor: isDarkMode ? "#a5d6a7" : "#4CAF50",
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
	modalContainer1: {
		flex: 1,
		height: "auto",
		width: "100%",
		padding: 20,
		backgroundColor: "#F2F6F9",
	},

	WorkoutTitle: {
		fontWeight: "bold",
		top: 60,
		fontSize: 27,
		left: 15,
	},
	closeModalTextWorkout: {
		fontSize: 15,
		fontWeight: 700,
		top: -573,
		left: 140,
		alignSelf: "center",
	},
	workoutList: {
		top: 76,
		flexDirection: "column",
	},
	workoutPosts: {
		flex: 1,
		flexDirection: "row",

		padding: 16,
		borderRadius: 10,
		width: "100%",
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
		elevation: 5,
		minHeight: 140,
		alignSelf: "center",
		marginBottom: 12, // Add margin bottom
	},
	workoutLeftContent: {
		flexDirection: "column",
		flex: 1,
		left: 15,
		position: "absolute",
	},
	workoutSubtitle: {
		fontSize: 17,
		fontWeight: "bold",
		top: 15,
	},
	workoutSubtitle2: {
		fontSize: 15,
		fontWeight: "bold",
		color: "grey",
		marginTop: 25,
	},
	workoutSubtitle3: {
		fontSize: 15,
		fontWeight: "bold",
		color: "grey",
		marginTop: 15,
	},

	workoutSubtitle4: {
		fontSize: 15,
		fontWeight: "bold",
		color: "grey",
		marginTop: 15,
	},
	workoutRightContent: {
		flex: 1,
		position: "absolute",
		right: 10,
	},
});

export default HomeScreen;
