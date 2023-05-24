import React, { useState } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  TouchableOpacity, 
  TextInput,
  Modal,
} from 'react-native';

const WeightInputModal = ({ visible, onClose, onWeightSubmit }) => {
  const [weightInput, setWeightInput] = useState('');

  const handleSubmitWeight = () => {
    onWeightSubmit(parseFloat(weightInput));
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.goalWeightText}>Current Weight:</Text>
          <TextInput
            style={styles.input}
            value={weightInput}
            onChangeText={setWeightInput}
            keyboardType="numeric"
            placeholder="Enter your current weight in pounds"
            placeholderTextColor="#BDBDBD"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmitWeight}
          >
            <Text style={styles.buttonText}>Set Current Weight</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default WeightInputModal;
