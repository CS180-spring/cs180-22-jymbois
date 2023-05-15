import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { useEffect } from 'react';
import InputSpinner from 'react-native-input-spinner';
import  Calendar  from 'react-native-calendars/src/calendar';
import { writeUserData, createExersisePath, createSet}  from "../hooks/databaseQueries";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations
import  {readData, checkWorkoutLogs, retrieveExercises}  from '../hooks/databaseQueries';
//import GenerateExerciseRecords from "./components/GenerateExerciseRecords.js";

const CalenderScreen = () => {
  const [showExerciseRecord, setShowExerciseRecordModal] = useState(false);
  const [showExerciseLogModal, setShowExerciseLogModal] = useState(false);
  const [recordDate, setRecordDate] = useState("");
  const [exerciseName, setExerciseName] = useState('');
  const [nameOfExercise, setNameOfExercise] = useState('');
  const [setNumbers, setSetNumbers] = useState(0);
  const [weights, setWeights] = useState(Array(setNumbers).fill(0));
  const [reps, setReps] = useState(Array(setNumbers).fill(0));
  const [hasWorkout, setHasWorkout] = useState(false);
  const [exercises, setExercises] = useState({});
  const handleNumberChange = (text) => {
    if (/^\d{0,2}$/.test(text)) { // Regex pattern to validate input between 1 and 100
      setSetNumbers(text);
      //console.log(setNumbers);
    }
  };

  const exitCalendarModal = ()=>{
    setShowExerciseLogModal(false);
    setSetNumbers(0);
  }
  const saveCalendarModal = async ()=>{
    setShowExerciseLogModal(false);
    setNameOfExercise(nameOfExercise);
    const user = auth.currentUser.uid;
    if(setNumbers != 0){
      //write on DatesBooleanArray, Uid:"True"
      let path = "DatesBoolean/" + recordDate;
      writeUserData( path,   user, "true");
      
      //insert the exercise into the DateExerciseLogs Uid/ExerciseName/{Set Information}
      const path1 = "DatesExerciseLogs/" + recordDate + "/" + user;
      createExersisePath(path1,exerciseName );
      for(var i = 1; i <= setNumbers; i++){
        let data2 = {
          weight: weights[i],
          reps: reps[i],
        }
        console.log(data2);
        await createSet( "DatesExerciseLogs/" + recordDate + "/" + user + "/" + exerciseName + "/",   "set " + i, data2);
      }
    }
    setSetNumbers(0);
  }
  const handleDayPress = (day) => {
    //console.log(day.dateString);
    setRecordDate(day.dateString);
    console.log(recordDate);
    
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
  const selectViewExerciseRecord = () => {
    if( recordDate != "") setShowExerciseRecordModal(true);
  }
  const selectInsertExerciseRecord = () => {
    if( recordDate != "") setShowExerciseLogModal(true);
  }
  const exitExerciseRecordModal = () => {
    setShowExerciseRecordModal(false);
    setExercises({});
    setHasWorkout(false);
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

  //This part is triggered everytime user select a date
  //This function check if user have a workout log on that day or not
  useEffect(() => {
    const fetchWorkoutLog = async () => {
      try {
        const user = auth.currentUser.uid;  // get the current user id
        const result = await checkWorkoutLogs(recordDate, user);
        // assuming that result will be "Undefined" if there's no workout
        setHasWorkout(result === "true");
        if(result === "true") console.log("You have workout on this day!!!" + recordDate);
        else console.log("You dont have a workout on this day!!!" + recordDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (recordDate) {
      fetchWorkoutLog();
    }
  }, [recordDate]);

  //This function is to generate Uis 
  useEffect(() => {
    const generateUis = async () => {
      try {
        const user = auth.currentUser.uid;  // get the current user id
        const exercises = await retrieveExercises(recordDate, user);
        setExercises(exercises);
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (hasWorkout) {
      generateUis();
    }
  }, [hasWorkout]);
 
  return (
    
    <ScrollView >  
    <Text style={styles.titleText}>Select the date to record your work out gym rat!</Text>
      <Calendar 
        style={styles.calendar} 
        onDayPress={ handleDayPress}
        minDate={"2023-04-01"}
        maxDate={"2023-12-31"}
        hideExtraDays={true}
        markedDates={{
          [recordDate]: {
            selected: true,
            selectedColor: 'tan', // or any color you want for the selected date
          }
        }}
      />

      <View style={styles.buttons}>
        <TouchableOpacity 

          onPress={selectViewExerciseRecord}
          style={styles.button3}> 
        <Text style={ styles.buttonText }>View Exercise Record</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={selectInsertExerciseRecord}
          style={styles.button3}> 
          <Text style={ styles.buttonText }>Insert Exercise Record</Text>
        </TouchableOpacity>
      
      </View>
      
    
      <Modal
         visible={showExerciseLogModal} animationType="fade"
         style ={styles.exerciseLogModal} 
      >
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {{flex: 1}}
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
       </KeyboardAvoidingView>
      </Modal>


      <Modal
         visible={showExerciseRecord} animationType="fade"
         style ={styles.exerciseLogModal} 
      >
       <ScrollView>
       {
        recordDate && (<Text style={{marginTop: 100, marginLeft: 30 ,color: 'tan', fontWeight: 800, fontSize: 50, }}>{recordDate}</Text>)
       }

    <View style={styles.exercisesBox}>
      { hasWorkout ? Object.entries(exercises).map(([exercise, sets], index) => (
        <View key={index} style = {styles.exerciseBox}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: "tan", }}>{exercise}</Text>
          {Object.entries(sets).map(([setName, setDetails], index) => (
            <Text key={index} style={{  fontSize: 14, color: "tan", }}>
              {setName}: {setDetails.reps} reps at {setDetails.weight} lbs
            </Text>
          ))}
        </View>
      )) : null}
    </View>

       <View style={styles.returnButtonContainer}>
        <TouchableOpacity 
          onPress={exitExerciseRecordModal}
          style={styles.button2}> 
          <Text style={ styles.buttonText }>Return</Text>
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
  returnButtonContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderColor: "tan",
    borderRadius: 10, // Adjust as needed
    borderWidth: 1,
   // Android shadow properties
  elevation: 5,

  // iOS shadow properties
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.35,
  shadowRadius: 3.84,
},
button3: {
  backgroundColor: 'tan',
  borderRadius: 20, // Increase for more rounded corners
  borderColor: '#D2B48C', // Similar to tan, adjust as needed
  borderWidth: 1, // Set to create a border around the button
  margin: 40,
  padding: 10,
  width: 110,
  alignItems: 'center',
  justifyContent: 'center', // Center the text vertically

  // Android shadow properties
  elevation: 5,

  // iOS shadow properties
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
},
});


export default CalenderScreen;

