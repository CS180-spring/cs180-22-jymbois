import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import  Calendar  from 'react-native-calendars/src/calendar';

const CalenderScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (

    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => setShowModal(true)}
      style={ styles.button}>
          <Text style={{ color: 'white', fontSize: 22}}>Show Calendar</Text>

      </TouchableOpacity>
      
  
      <Modal visible={showModal} animationType="fade">
      <TouchableOpacity 
        onPress={() => setShowModal(false)}
        style={styles.button}> 
       <Text style={ styles.buttonText }>Close Calendar</Text>
      </TouchableOpacity>
        
      <Calendar 
        style={styles.calendar} 
        onDaypress={date => console.log(date)}
        initialDate={'2023-04-21'}
        minDate={"2023-04-01"}
        maxDate={"2023-12-31"}
      />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black', 
    borderRadius: 10, 
    margin: 40,
    padding: 10,
    width: 200,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white', 
    fontSize: 22,
  },
  calendar: {
    borderRadius: 10, 
    elevation: 4, 
    margin: 40,
    marginTop: 100,
  },
});


export default CalenderScreen
/*

import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import  Calendar  from 'react-native-calendars/src/calendar';


/*
export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (

    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => setShowModal(true)}
      style={{ 
        backgroundColor: 'black', 
        borderRadius: 10, 
        margin: 40,
        padding: 10,
        width: 200,
        alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 22}}>Show Calendar</Text>

      </TouchableOpacity>
      
  
      <Modal visible={showModal} animationType="fade">
      <TouchableOpacity 
      onPress={() => setShowModal(false)}
      style={{ 
        backgroundColor: 'black', 
        borderRadius: 10, 
        margin: 40,
        padding: 10,
        width: 200,
        alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 22}}>Close Calendar</Text>
      </TouchableOpacity>
        <Calendar 
        style={{ borderRadius: 10, 
        elevation: 4, 
        margin: 40,
        marginTop: 100,
        }} onDaypress={date => console.log(date)}
        initialDate={'2023-04-21'}
        minDate={"2023-04-01"}
        maxDate={"2023-12-31"}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/