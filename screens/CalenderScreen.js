import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import  Calendar  from 'react-native-calendars/src/calendar';
import { writeUserData, createExersisePath, createSet}  from "../hooks/databaseQueries";
import  readData  from '../hooks/databaseQueries';
const CalenderScreen = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [recordDate, setRecordDate] = useState("");
  const [exerciseName, setExerciseName] = useState('');
  const [nameOfExercise, setNameOfExercise] = useState('');
  const [setNumbers, setSetNumbers] = useState(0);
  const [weights, setWeights] = useState(Array(setNumbers).fill(0));
  const [reps, setReps] = useState(Array(setNumbers).fill(0));

 
  const handleNumberChange = (text) => {
    if (/^\d{0,2}$/.test(text)) { // Regex pattern to validate input between 1 and 100
      setSetNumbers(text);
      //console.log(setNumbers);
    }
  };
  const exitCalendarModal = ()=>{
    setShowModal2(false);
    setSetNumbers(0);
  }
  const saveCalendarModal = ()=>{
    setShowModal2(false);
    setNameOfExercise(nameOfExercise);
    if(setNumbers != 0){
      //write on left array
      let path = "DatesBoolean/" + recordDate;
      writeUserData( path,   "5StlXUIxmPMGgzFFvXPF0RKICcu1", "true");
      

      //insert the exercise into the right array
      const path1 = "DatesExerciseLogs/" + recordDate + "/" + "5StlXUIxmPMGgzFFvXPF0RKICcu1";
      createExersisePath(path1,exerciseName );
      const path2 = "DatesExerciseLogs/" + recordDate + "/" + "5StlXUIxmPMGgzFFvXPF0RKICcu1/" + exerciseName;
      for(var i = 1; i <= setNumbers; i++){
        let data2 = {
          weight: weights[i],
          reps: reps[i],
        }
        console.log(data2);
        createSet( path2,   "set " + i, data2);
      }
    }
    setSetNumbers(0);
  }
  const handleDayPress = (day) => {
    //console.log(day.dateString);
    setRecordDate(day.dateString);
    console.log(recordDate);
    setShowModal1(false);
    setShowModal2(true);
  };
  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };
  const handleRepsChange = (index, value) => {
    const newReps = [...reps];
    newReps[index] = value;
    setReps(newReps);
  };
  const handleExerciseName = (input) => {
    setExerciseName(input);
  }
  const set = [];
  for(let i = 1; i <= setNumbers; i++){
    set.push(
      <View style={styles.exerciseLogs} key={i}>
        <Text style={styles.textStyle}>Set {i}</Text>
          <View styles={styles.log}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 28}}>Weight</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            value={weights[i]}
            onChange={(value) => handleWeightChange(i, value)}
            />
            </View >

            <View style={{color: "tan", fontWeight:800, marginLeft:0}}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 23}}>No. Reps</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            value={reps[i]}
            onChange={(value) => handleRepsChange(i, value)}
            />
            </View>
        </View>
    );
  }

  return (
    
    <ScrollView >  
    <Text style={styles.titleText}>Select the date to record your work out gym rat!</Text>
      <Calendar 
        style={styles.calendar} 
        onDayPress={ handleDayPress}
        initialDate={'2023-04-21'}
        minDate={"2023-04-01"}
        maxDate={"2023-12-31"}
        hideExtraDays={true}
      />

      <Modal
         visible={showModal2} animationType="fade"
         style ={styles.exerciseLogModal} 
      >
       <ScrollView>
       {
        recordDate && (<Text style={{marginTop: 100, marginLeft: 30 ,color: 'tan', fontWeight: 800, fontSize: 50, }}>{recordDate}</Text>)
        
       }
       <TextInput
        placeholder= "Exercise Name"
        style={styles.input}
        onChangeText={handleExerciseName}
        value={exerciseName}

      />
       <View style={styles.setContainer}>
       <Text style={{color:"tan", fontSize: 16, fontWeight: 800}}>No. Set</Text>
       <InputSpinner style={styles.numberInput}
         max={10}
         min={0}
         color={"#d2b48c"}
         onChange={handleNumberChange}/>
       </View>

       {set}

       <View style={styles.buttons}>
       <TouchableOpacity 
        onPress={saveCalendarModal}
        style={styles.button2}> 
       <Text style={ styles.buttonText }>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={exitCalendarModal}
        style={styles.button2}> 
       <Text style={ styles.buttonText }>Cancel</Text>
      </TouchableOpacity>
       </View>

       </ScrollView>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20,
  },
  button1: {
    backgroundColor: 'tan', 
    borderRadius: 10, 
    margin: 40,
    padding: 10,
    width: 1000,
    alignItems: 'center'
  },
  button2: {
    backgroundColor: 'tan', 
    borderRadius: 10, 
    margin: 40,
    padding: 10,
    width: 100,
    alignItems: 'center'
  },
  buttons:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxWidth: '100%',

  },
  buttonText: {
    color: 'white', 
    fontSize: 22,
  },
  calendarModal: {
   flex: 1,
   backgroundColor: 'black',
   alignItems: 'center',
   justifyContent: 'center',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    width: '100%', // Set the width of the calendar to 100%
    maxWidth: 400, // Set a maximum width for the calendar
    maxHeight: 600, // Set a maximum height for the calendar
  },
  titleText: {
    color: 'tan',
    fontWeight: 800,
    fontSize: 15,
    marginLeft: 5,
    
  },
  exerciseLogModal: {
  flex: 1,
   backgroundColor: 'black',
   alignItems: 'center',
   justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "tan",
    borderRadius: 10,
  },
  numberInput: {
    width: 170,
    height: 40,
    borderWidth: 1,
    borderColor: 'tan',
    paddingHorizontal: 10,
    textColor: 'tan',
  },
  setContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    marginTop: 10,
  },
  numberInput1: {
    width: 110,
    height: 40,
  },
  exerciseLogs: {
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    height: 100,
    borderWidth: 1,
    borderColor: "tan",
    margin: 10,
    borderRadius: 20,
  },
  log: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  textStyle:{
    color: "tan", 
    fontWeight:800,
  },
});


export default CalenderScreen;

/*
<View style={styles.exerciseLogs}>
        <Text style={styles.textStyle}>Set {setNumbers}</Text>
          
          <View styles={styles.log}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 28}}>Weight</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            />
            </View >

            <View style={{color: "tan", fontWeight:800, marginLeft:0}}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 23}}>No. Reps</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            />
            </View>
        </View>
*/