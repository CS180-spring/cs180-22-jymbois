import React, { useState } from 'react';
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
import {
  BarChart,
} from 'react-native-chart-kit'
  //import CircularProgress from 'react-native-circular-progress-indicator';

const GraphScreen = ({ route }) => {
  const [goalWeight, setGoalWeight] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { weight } = route.params;

  

  const handleGoalWeightChange = (text) => {
    setGoalWeight(text);
  };

  // it works!!! lets goooooooo, just need to this will give the percent how close you are the goal, idid the todayys weight and u gotta add the goal weight
  const calculateProgress = () => {
    const goal = parseFloat(goalWeight);
    const current = parseFloat(weight);
    const answer = ((weight - goal)/goal * 100).toFixed(2);
    //return (100 -answer);
    const perfect = (100 - answer);
    if (perfect >= 100){
      return 100;
    }
    return (100 - answer);
  };
  const ContentBox = ({ title, children }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <Text>{children}</Text>
        </View>
      </View>
    );
  };
  const barData = {
    labels: ['Today', 'Goal', 'June', 'July'],
    datasets: [
      {
        data: [weight, goalWeight, 150, 180],
      },
    ],
  };
  const chartConfig = {
    borderRadius: 30,
    backgroundGradientFrom: '#57C84D',
    backgroundGradientTo: '#C5E8B7',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
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
      <View style={[styles.contentContainer]}>
      <View style={styles.activityContent}>
      <Text style={styles.title2}>Weekly Activities</Text>
      <Text style={styles.activityText}>You have done 5 activities this week.
        Keep it up</Text>
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
        style={{flex: 1,  marginTop: 50, borderRadius: 16}}
         data={barData}
         width={325}
         height={250}
         yAxisLabel={'lbs'}
         chartConfig={chartConfig}
       /> 
        </View> 
      </View>
      
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		height: "auto",
	},
  titleContainer: {
		height: "10%",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
  contentContainer: {
		flex: 1,
    backgroundColor: "#FFFFFF",
		height: "auto",
	},
  activityContent: {
    flex: 1,
    padding: 20,
    borderRadius: 30,
    maxWidth: 370,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
    elevation: 10,
    height: 300,
    marginLeft: 5,
  },
  barGraphContainer: {
    flex: 3,
    padding: 20,
    borderRadius: 30,
    maxWidth: 370,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.11,
    shadowRadius: 5,
    elevation: 10,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  activityText: {
    fontSize: 15,
    borderBottomWidth: 1,
    marginTop: 30,
    marginLeft: 10,
  },
  activityText2: {
    fontSize: 15,
    marginTop: 30,
    marginLeft: 10,
  },
  bottomLeftContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
  },
  bottomLeftText: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
  },
  bottomLeftNumber: {
    fontSize: 14,
    marginRight: 10,
  },
  bottomRightContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
  },
  bottomRightText: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
  },
  bottomRightNumber: {
    fontSize: 14,
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
  goalButtonContainer: {
    position: 'absolute',
    right: 100,
		
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
    backgroundColor: "white",
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
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
		color: "#4A4A4A",
		marginBottom: 10,
		marginLeft: 17,
		marginTop: 5,
	},
  title: {
		fontSize: 26,
		fontWeight: "bold",
		color: "#4A4A4A",
		marginLeft: 15,
	},
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4A4A4A",
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
    color: "#1363DF",
    position: "absolute",
    top: 15,
    marginRight: 40,
  },
});


export default GraphScreen