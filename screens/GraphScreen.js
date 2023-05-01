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
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.plusButtonText}>+</Text>
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
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
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
    backgroundColor: '#B8860B',
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
  plusButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#B8860B',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 250,
    backgroundColor: '#F2F2F2',
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
    backgroundColor: '#B8860B',
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
    backgroundColor: "tan",
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#F2F2F2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B8860B',
  },
  fullProgress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#B8860B',
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
});


export default GraphScreen