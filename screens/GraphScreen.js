import React, { useState, useContext,useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Modal,
  ScrollView,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import ThemeContext from "../hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { writeUserWeight, getCurrentWeight, getWeightHistory,writeGoalWeight,getGoalWeight } from "../hooks/databaseQueries";
import { auth } from "../configuration/firebaseConfig";
import { readData } from "../hooks/databaseQueries";
import RefreshContext, { RefreshProvider } from "../hooks/RefreshContext";

//import CircularProgress from 'react-native-circular-progress-indicator';

const GraphScreen = ({ route }) => {
	const { refreshKey, setRefreshKey } = useContext(RefreshContext);
	const user = auth.currentUser;
	const uid = user ? user.uid : null;
	const [goalWeight, setGoalWeight] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [weight, setWeight] = useState(0); // Initialize weight to zero
	const { isDarkMode } = React.useContext(ThemeContext);
	const styles = createThemedStyles(isDarkMode);
	const [weightModalVisible, setWeightModalVisible] = useState(false); // to add weight to modal
	const [weightHistory, setWeightHistory] = useState({});
//Get the user goalWeight
  

	useEffect(() => {
		getWeightHistory(uid).then(data => {
		  setWeightHistory(data);
		}).catch(err => {
		  console.error(err);
		});
	  }, [uid, refreshKey]);

	const handleWeightSubmit = async (weight) => {
		try {
			const uid = auth.currentUser.uid;
			if (uid) {
				setRefreshKey(refreshKey + 1);
				await writeUserWeight(uid, weight);
				console.log("current weight added");
				setWeight(weight);
				setWeightModalVisible(false);
			} else {
				console.error("User not authenticated.");
			}
		} catch (error) {
			console.error("Failed to store weight:", error);
		}
	};
	const formatDate = (timestamp) => {
		const date = new Date(parseInt(timestamp));
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
	  };

    const max_xaxis= 4;
    const weightHistoryKeys = Object.keys(weightHistory);
    const weightHistoryValues = Object.values(weightHistory);
    const startIndex = Math.max(weightHistoryKeys.length - max_xaxis, 0);
    const endIndex = weightHistoryKeys.length;

	  const barData = {
		labels: weightHistoryKeys.map(formatDate).slice(startIndex, endIndex),
		datasets: [
		  {
			data: weightHistoryValues.map(Number).slice(startIndex, endIndex),
		  },
		],
	  };

	  const lineData = {
		labels: weightHistoryKeys.map(formatDate).slice(startIndex, endIndex),
		datasets: [
		  {
			data: weightHistoryValues.map(Number).slice(startIndex, endIndex),
		  },
		],
	  };

    const progressBarData = {
      labels: Object.keys(weightHistory).map(formatDate),
      datasets: [
        {
        data: Object.values(weightHistory).map(Number),
        },
      ],
      };

      const progressLineData = {
        labels: Object.keys(weightHistory).map(formatDate),
        datasets: [
          {
          data: Object.values(weightHistory).map(Number),
          },
        ],
        };
	const handleGoalWeightChange = (text) => {
		setGoalWeight(text);
	};

	// it works!!! lets goooooooo, just need to this will give the percent how close you are the goal, idid the todayys weight and u gotta add the goal weight
	const calculateProgress = () => {
		const goal = parseFloat(goalWeight);
		const current = parseFloat(weight);
		const answer = (((current - goal) / goal) * 100).toFixed(2);
		const perfect = 100 - answer;
		if (perfect >= 100) {
			return 100;
		}
		return 100 - answer;
	};
//*
	
	const BarChartConfig = {
    backgroundGradientFrom: isDarkMode ? '#333': 'white',
    backgroundGradientTo: isDarkMode ? '#333': 'white',
    decimalPlaces: 1,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 61, 128, ${opacity})`,
    style: {
      borderRadius: 10,
    },
    fillShadowGradient: '#fff',
  };

  const lineChartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 61, 128, ${opacity})`,
    labelColor: (opacity = 1) => `transparent`,
    fillShadowGradient: '#fff',
  };



	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<View style={[styles.smallContentTitle]}>
						<Text style={styles.title}>Your Progress</Text>
						<Text style={styles.subtitle2}>See How You Improve</Text>
					</View>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={weightModalVisible}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.weightText}> Current Weight:</Text>
							<TextInput
								style={styles.input}
								value={weight.toString()}
								onChangeText={setWeight}
								keyboardType="numeric"
								placeholder="Enter your current weight in pounds"
								placeholderTextColor="#BDBDBD"
							/>
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									handleWeightSubmit(weight);
								}}
							>
								<Text style={styles.buttonText}>Add Weight</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setWeightModalVisible(false)}
							>
								<Text style={styles.closeButtonText}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<View style={[styles.contentContainer]}>
					<View style={styles.activityContent}>
						<Text style={styles.title2}>Weekly Activities</Text>
            <TouchableOpacity
							style={styles.goalButtonContainer}
							onPress={() => setModalVisible(true)}
						>
							<Text style={styles.goalButton}>Add Goal -{">"} </Text>
						</TouchableOpacity>
            <Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
						>
							<View style={styles.modalContainer}>
								<View style={styles.modalContent}>
									<Text style={styles.goalWeightText}>Goal Weight:</Text>
									<TextInput
										style={styles.input}
										value={goalWeight}
										onChangeText={handleGoalWeightChange}
										keyboardType="numeric"
										placeholder="Enter your goal weight in pounds"
										placeholderTextColor="#BDBDBD"
									/>
								<TouchableOpacity
								style={styles.button}
								onPress={() => {
								
                console.log('Goal weight button pressed. Goal weight:', goalWeight);
                setProgress(calculateProgress());
                setModalVisible(false);
								}}
							>
										<Text style={styles.buttonText}>Set Goal Weight</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.closeButton}
										onPress={() => setModalVisible(false)}
									>
										<Text style={styles.closeButtonText}>Close</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Text style={styles.activityText}>
							You have done <Text style={{ fontWeight: "bold" }}>5</Text>{" "}
							activities this week. Keep it up.
						</Text>
						<View style={styles.bottomLeftContainer}>
							<View style={styles.activityRow}>
								<Text style={styles.bottomLeftText}>Goal Weight:</Text>
								<Text style={styles.bottomLeftNumber}>{goalWeight}</Text>
							</View>
						</View>
						<View style={styles.bottomRightContainer}>
							<View style={styles.activityRow}>
								<Text style={styles.bottomRightText}>Progress:</Text>
								<Text style={styles.bottomRightNumber}>{progress}</Text>
							</View>
						</View>
					</View>
					<View style={styles.barGraphContainer}>
						<Text style={styles.title2}>Goal Progression</Text>

						<TouchableOpacity
							style={styles.goalButtonContainer2}
							onPress={() => setWeightModalVisible(true)}
						>
							<Text style={styles.weightButton}>Add Weight -{">"} </Text>
						</TouchableOpacity>
            <TouchableOpacity
							style={styles.progressContainer}
							onPress={() => setProgressModalVisible(true)}
						>
							<Text style={styles.progressButton}>Total Progression </Text>
						</TouchableOpacity>
            <Modal
							animationType="slide"
							transparent={true}
							visible={progressModalVisible}
						>         
            <View style={styles.modalContainer}>
              <View style={styles.progressContent}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
              <BarChart
              	style={{
                  flex: 1,
                  alignContent: "center",
                  marginTop: 45,
                  borderRadius: 10,
                }}
                data={progressBarData}
                width={70 * progressBarData.labels.length}
                height={300}
                yAxisLabel={"lbs"}
                chartConfig={BarChartConfig}
                fromNumber={400}
                fromZero={true}
                showValuesOnTopOfBars={true}
              />
              <LineChart
              style={{
                position: "absolute",
								marginLeft: 31,
                top: 47,
							}}
							data={progressLineData}
							width={70 * progressLineData.labels.length}
							height={300}
							yAxisLabel={"lbs"}
							chartConfig={lineChartConfig}
							withHorizontalLines={false}
							fromNumber={400}
							fromZero={true}
							bezier
						/>
              </ScrollView>
              <TouchableOpacity
										style={styles.closeButton}
										onPress={() => setProgressModalVisible(false)}
									>
										<Text style={styles.closeButtonText}>Close</Text>
									</TouchableOpacity>
            </View>
            </View>
          
          </Modal>
						<BarChart
							style={{
								flex: 1,
								alignContent: "center",
								marginTop: 45,
								borderRadius: 10,
							}}
							data={barData}
							width={325}
							height={300}
							yAxisLabel={"lbs"}
							chartConfig={BarChartConfig}
							fromNumber={400}
							fromZero={true}
							showValuesOnTopOfBars={true}
						/>
						<LineChart
							style={{
								alignContent: "center",
								marginLeft: 30,
								marginBottom: 25,
								borderRadius: 10,
							}}
							data={lineData}
							width={325}
							height={300}
							yAxisLabel={"lbs"}
							chartConfig={lineChartConfig}
							withHorizontalLines={false}
							fromNumber={400}
							fromZero={true}
							bezier
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
const createThemedStyles = (isDarkMode) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: isDarkMode ? "black" : "#FFFFFF",
			height: "auto",
		},
		titleContainer: {
			height: "12%",
			justifyContent: "flex-start",
			flexDirection: "row",
		},
		contentContainer: {
			flex: 1,
			backgroundColor: isDarkMode ? "black" : "#FFFFFF",
			height: "auto",
		},
		activityContent: {
			flex: 1,
			padding: 20,
			borderRadius: 10,
			maxWidth: 370,
			backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
			shadowColor: "#000",
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.11,
			shadowRadius: 5,
			elevation: 10,
			height: 300,
			marginLeft: 10,
		},
		barGraphContainer: {
			flex: 3,
			padding: 20,
			borderRadius: 10,
			maxWidth: 370,
			backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
			shadowColor: "#000",
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.11,
			shadowRadius: 5,
			elevation: 10,
			marginLeft: 10,
			marginTop: 20,
			marginBottom: 20,
		},
		activityText: {
			color: isDarkMode ? "#fff" : "#000",
			fontSize: 15,
			borderBottomWidth: 1,
			marginTop: 30,
			marginRight: 100,
		},
		bottomLeftContainer: {
			position: "absolute",
			bottom: 15,
			left: 10,
			flexDirection: "row",
		},
		bottomLeftText: {
			color: isDarkMode ? "#fff" : "#000",
			fontSize: 15,
			fontWeight: "400",
			marginRight: 10,
		},
		bottomLeftNumber: {
			color: isDarkMode ? "#fff" : "#000",
			fontWeight: "900",
			fontSize: 15,
			marginRight: 10,
		},
		bottomRightContainer: {
			position: "absolute",
			bottom: 15,
			right: 10,
			flexDirection: "row",
		},
		bottomRightText: {
			color: isDarkMode ? "#fff" : "#000",
			fontSize: 15,
			fontWeight: "400",
			marginLeft: 10,
		},
		bottomRightNumber: {
			color: isDarkMode ? "#fff" : "#000",
			fontWeight: "800",
			fontSize: 15,
			marginLeft: 10,
		},
		activityRow: {
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: 10,
		},
		progressBarContainer: {
			width: 200,
			height: 200,
			borderRadius: 150,
			backgroundColor: "white",
			alignItems: "top",
			justifyContent: "center",
			marginBottom: 30,
		},
		goalWeightContainer: {
			flexDirection: "row",
			alignItems: "center",
			marginBottom: 20,
		},
		goalWeightText: {
			fontSize: 20,
			marginRight: 10,
			color: isDarkMode ? "#fff" : "#000",
		},
		weightText: {
			fontSize: 20,
			marginRight: 10,
			color: isDarkMode ? "#fff" : "#000",
		},
		input: {
			fontSize: 15,
			height: 50,
			width: 150,
			paddingLeft: 20,
			backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
			borderRadius: 10,
			color: isDarkMode ? "#fff" : "#000",
		},
		button: {
			backgroundColor: isDarkMode ? "#8BC34A" : "#1363DF",
			borderRadius: 10,
			width: "50%",
			height: 30,
			alignItems: "center",
			justifyContent: "center",
		},
		buttonText: {
			color: isDarkMode ? "#fff" : "#fff",
			fontSize: 15,
			fontWeight: "bold",
		},
		closeButtonText: {
			color: isDarkMode ? "#fff" : "#000",
			fontSize: 15,
			fontWeight: "bold",
			marginTop: 15,
		},
		goalButtonContainer: {
			position: "absolute",
			right: 100,
		},
		placeholderColor: {
			color: isDarkMode ? "#fff" : "#000",
		},

		modalContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: isDarkMode ? "#000" : "#FFFFFF",
		},
		modalContent: {
			width: "80%",
			backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
			padding: 20,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "center",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			elevation: 2,
		},
    progressContent:{
      width: "100%",
			backgroundColor: isDarkMode ? "#333" : "#FFFFFF",
			padding: 20,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "center",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			elevation: 2,
    },
		title2Container: {
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		subtitle2: {
			fontSize: 20,
			// fontWeight: "bold",
			color: isDarkMode ? "#fff" : "#000",
			marginBottom: 10,
			marginLeft: 17,
			marginTop: 5,
		},
		title: {
			fontSize: 26,
			fontWeight: "bold",
			color: isDarkMode ? "#fff" : "#4A4A4A",
			marginLeft: 15,
			top: 10,
		},
		title2: {
			fontSize: 15,
			fontWeight: "bold",
			color: isDarkMode ? "#fff" : "#000",
			position: "absolute",
			top: 15,
			marginLeft: 15,
		},
		smallContentTitle: {
			flex: 1,
			flexDirection: "column",
		},
		goalButton: {
			fontSize: 15,
			fontWeight: "bold",
			color: isDarkMode ? "#8BC34A" : "#1363DF",
			position: "absolute",
			marginRight: 50,
		},
    weightButton: {
			fontSize: 15,
			fontWeight: "bold",
			color: isDarkMode ? "#8BC34A" : "#1363DF",
			position: "absolute",
			top: 15,
			marginRight: 40,
		},
    progressButton: {
			fontSize: 15,
			fontWeight: "bold",
			color: isDarkMode ? "#8BC34A" : "#1363DF",
			alignContent: "center",
      left: 125,
			bottom: 15,
		},
		goalButtonContainer: {
			flexDirection: "column",
			position: "absolute",
			right: 80,
			marginRight: 15,
			marginTop: 15,
		},
		goalButtonContainer2: {
			flexDirection: "column",
			position: "absolute",
			right: 115,
		},
    progressContainer: {
      position: "absolute",
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",   
    },
	});
};

export default GraphScreen;