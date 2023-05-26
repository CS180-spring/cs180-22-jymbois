import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  TouchableOpacity, 
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {BarChart,LineChart} from 'react-native-chart-kit'
import ThemeContext from "../hooks/ThemeContext";
import WeightInputModal from './WeightInputModal';
import { Ionicons } from '@expo/vector-icons';
import { writeUserWeight } from "../hooks/databaseQueries";
import { auth } from '../configuration/firebaseConfig';
import RefreshContext, { RefreshProvider } from '../hooks/RefreshContext';


  //import CircularProgress from 'react-native-circular-progress-indicator';

  const GraphScreen = ({ route }) => {
    const { refreshKey, setRefreshKey } = useContext(RefreshContext);
    const user = auth.currentUser;
    const uid = user ? user.uid : null;
    const [goalWeight, setGoalWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [weight, setWeight] = useState(0); // Initialize weight to zero
    const { isDarkMode } = React.useContext(ThemeContext);
    const styles = createThemedStyles(isDarkMode);
    const [weightModalVisible, setWeightModalVisible] = useState(false); // to add weight to modal
    
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
    
    

  const handleGoalWeightChange = (text) => {
    setGoalWeight(text);
  };

  // it works!!! lets goooooooo, just need to this will give the percent how close you are the goal, idid the todayys weight and u gotta add the goal weight
  const calculateProgress = () => {
    const goal = parseFloat(goalWeight);
    const current = parseFloat(weight);
    const answer = ((current - goal)/goal * 100).toFixed(2);
    const perfect = (100 - answer);
    if (perfect >= 100){
      return 100;
    }
    return (100 - answer);
  };

  const barData = {
    labels: ['Today', 'Goal', 'June', 'July'],
    datasets: [
      {
        data: [weight, goalWeight, 146, 220],
      },
    ],
  };

  const lineData = {
    labels: ['Today', 'Goal', 'June', 'July'],
    datasets: [
      {
        data: [weight, goalWeight, 146, 220],
      },
    ],
  };
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
              <Text style={styles.weightText}>Weight:</Text>
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
      <   Text style={styles.activityText}>
             You have done <Text style={{fontWeight: 'bold'}}>5</Text> activities this week. Keep it up.
             </Text>
      <View style={styles.bottomLeftContainer}>
        <View style={styles.activityRow}>
          <Text style={styles.bottomLeftText}>Push</Text>
          <Text style={styles.bottomLeftNumber}>3</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.bottomLeftText}>Pull</Text>
          <Text style={styles.bottomLeftNumber}>7</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.bottomLeftText}>Legs</Text>
          <Text style={styles.bottomLeftNumber}>11</Text>
        </View>
      </View>
      <View style={styles.bottomRightContainer}>
      <View style={styles.activityRow}>
        <Text style={styles.bottomRightText}>Total Time:</Text>
        <Text style={styles.bottomRightNumber}>2h 30m</Text>
      </View>
      </View>
			</View>
      <View style={styles.barGraphContainer}>  
       <Text style={styles.title2}>Goal Progression</Text>
       
       <TouchableOpacity
       style={styles.goalButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.goalButton}>Add Goal -{">"} </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.goalButtonContainer2}
            onPress={() => setWeightModalVisible(true)}
          >
            <Text style={styles.goalButton}>Add Weight -{">"} </Text>
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
       <BarChart
        style={{flex: 1,  marginTop: 50, borderRadius: 10}}
         data={barData}
         width={325}
         height={300}
         yAxisLabel={'lbs'}
         chartConfig={BarChartConfig}
         fromNumber={400}
         fromZero={true}
         showValuesOnTopOfBars={true}
       /> 
        <LineChart
        style={{ position: 'absolute', bottom: 24.2, right: -5, borderRadius: 10 }}
         data={lineData}
         width={325}
         height={300}
         yAxisLabel={'lbs'}
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
    color: isDarkMode ? '#fff' : '#000',
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
    color: isDarkMode ? '#fff' : '#000',
    fontSize: 15,
    fontWeight: "400",
    marginRight: 10,
  },
  bottomLeftNumber: {
    color: isDarkMode ? '#fff' : '#000',
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
    color: isDarkMode ? '#fff' : '#000',
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
  },
  bottomRightNumber: {
    color: isDarkMode ? '#fff' : '#000',
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 10,
  },
  activityRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarContainer: {
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: 'white',
    alignItems: 'top',
    justifyContent: 'center',
    marginBottom: 30,
  },
  goalWeightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalWeightText: {
    fontSize: 20,
    marginRight: 10,
    color: isDarkMode ? '#fff' : '#000',
  },
  input: {
    fontSize: 20,
    height: 50,
    width: 150,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#8BC34A',
    borderRadius: 25,
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  popupInput: {
    fontSize: 20,
    height: 50,
    width: '100%',
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? '#000' : '#fff',
  },
  modalContent: {
    width: '80%',
    backgroundColor: isDarkMode ? '#555' : '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2
  },
  progressText: {
    position: 'absolute',
    marginRight: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  fullProgress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#8BC34A',
    transform: [{ rotateZ: '-90deg' }],
  },
  progressFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#F2F2F2',
    borderLeftColor: '#B8860B',
    borderBottomColor: '#B8860B',
    transform: [{ rotateZ: '-90deg' }],
  },
	title2Container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
  subtitle2: {
		fontSize: 20,
		// fontWeight: "bold",
		color: isDarkMode ? '#fff' : '#000',
		marginBottom: 10,
		marginLeft: 17,
		marginTop: 5,
	},
  title: {
		fontSize: 26,
		fontWeight: "bold",
		color: isDarkMode ? '#fff' : '#000',
		marginLeft: 15,
	},
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: isDarkMode ? '#fff' : '#000',
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
    color: isDarkMode ? "#8BC34A": "#1363DF",
    position: "absolute",
    top: 15,
    marginRight: 40,
  },
  goalButtonContainer: {
    flexDirection: 'column',
    position: 'absolute',
    right: 100,
    margin: 15,
    marginTop: 20,
		
  },
  goalButtonContainer2: {
    flexDirection: 'column',
    position: 'absolute',
    right: 115,
		
  },
  closeButtonText:{
  color: isDarkMode ? '#fff' : '#000',
  },
  
});
};


export default GraphScreen