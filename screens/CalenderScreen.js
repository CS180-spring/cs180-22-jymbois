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
    setWeights(Array(setNumbers).fill(0));
    setReps(Array(setNumbers).fill(0));
  }
  const handleDayPress = (day) => {
    //console.log(day.dateString);
    setRecordDate(day.dateString);
    console.log(recordDate);
    
  };
  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = String(value);
    setWeights(newWeights);
  };
  const handleRepsChange = (index, value) => {
    const newReps = [...reps];
    newReps[index] = String(value);
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
    setWeights(Array(setNumbers).fill(0));
    setReps(Array(setNumbers).fill(0));
  }




  const set = [];
  for(let i = 1; i <= setNumbers; i++){
    set.push(
      <View style={styles.exerciseLogs} key={i}>
        <Text style={{color: "#6E7E85", fontWeight: 800,}}>Set {i}</Text>
          <View styles={styles.log}>
            
            <TextInput
              style={styles.numberInputWeight}
              value={weights[i]}
              onChangeText={(value) => handleWeightChange(i, value)}
              keyboardType="numeric"
              placeholder="Weight"
            />
            </View >

            <View style={{color: "#6E7E85", fontWeight:800, marginLeft:0}}>
            <TextInput
              style={styles.numberInputReps}
              value={reps[i]}
            onChangeText={(value) => handleRepsChange(i, value)}
            keyboardType="numeric"  
            placeholder="Reps"
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
    
    <ScrollView  style={styles.body}>  
      <Calendar 
        style={styles.calendar} 
        onDayPress={ handleDayPress}
        minDate={"2023-04-01"}
        maxDate={"2099-12-31"}
        hideExtraDays={true}
        markedDates={{
          [recordDate]: {
            selected: true,
            selectedColor: 'gray', // or any color you want for the selected date
          }
        }}
        theme={{
          textSectionTitleColor: 'black', // Changes the color of weekday names (Mon, Tue, etc.)
          monthTextColor: 'black', // Changes the color of the month name
          textMonthFontWeight: 'bold',  // Makes month name bold
          textMonthFontSize: 16, // Makes month name font size larger
          arrowColor: 'gray',
          todayTextColor: '#7ecfd4', // Changes the color of the current day
        }}
      />
      
      <Text style={styles.titleText}>Select a date:</Text>

      <View style={styles.calendarButtons}>
        <TouchableOpacity 

          onPress={selectViewExerciseRecord}
          style={styles.viewERButton}> 
        <Text style={ styles.calendarButtonTextTop }>View</Text>
        <Text style={ styles.calendarButtonTextBottom }>Exercise Records</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={selectInsertExerciseRecord}
          style={styles.insertERButton}> 
          <Text style={ styles.calendarButtonTextTop }>Insert</Text>
          <Text style={ styles.calendarButtonTextBottom }>Exercise Record</Text>
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
        recordDate && (<Text style={styles.insertERTextTitle}>{recordDate}</Text>)
        
       }
       <TextInput
        placeholder= "Exercise Name"
        style={styles.input}
        onChangeText={handleExerciseName}
        value={exerciseName}

      />
       <View style={styles.setContainer}>
       <Text style={styles.repsText}>No. Set</Text>
       <InputSpinner style={styles.numberInput}
         max={10}
         min={0}
         color={"#6E7E85"}
         onChange={handleNumberChange}
         skin={"modern"}
         shadow={false}
         />
       </View>

       {set}

       <View style={styles.buttons}>
       <TouchableOpacity 
        onPress={exitCalendarModal}
        style={styles.insertModalButtons}> 
       <Text style={ styles.buttonText }>Cancel</Text>
      </TouchableOpacity>

       <TouchableOpacity 
        onPress={saveCalendarModal}
        style={styles.insertModalButtons}> 
       <Text style={ styles.buttonText }>Save</Text>
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
        recordDate && (<Text style={ styles.insertERTextTitle}>{recordDate}</Text>)
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
  body: {
    backgroundColor: 'white',
  },
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
  insertModalButtons: {
    backgroundColor: '#6E7E85', 
    borderRadius: 10, 
    margin: 40,
    padding: 10,
    width: 100,
    alignItems: 'center'
  },
  calendarButtons:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%', 
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
  
  calendarButtonTextBottom: {
    color: 'white', 
    fontSize: 18,
    marginTop: 5,
    marginRight: 130,
    paddingBottom: 6
  },
  calendarButtonTextTop: {
    color: 'white', 
    fontSize: 22,
    fontWeight: 700,
    marginRight: 200,
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
    width: '90%', // Set the width of the calendar to 90%
    maxWidth: 400, // Set a maximum width for the calendar
    maxHeight: 600, // Set a maximum height for the calendar
    alignSelf: 'center', // Center the calendar horizontally
    justifyContent: 'center', // Center the calendar vertically
    marginTop: 25,
  
    // Android shadow properties
    elevation: 2, // Lower than before to create a lighter shadow
  
    // iOS shadow properties
    shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
  },
  titleText: {
    fontWeight: 700,
    fontSize: 25,
    marginLeft: 25, // There were two marginLeft properties, I left the larger one
    color: 'black',
    marginTop: 30,
    marginBottom: 10,
  
    // Text shadow properties
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Very light shadow
    textShadowOffset: { width: -1, height: 1 }, // Offset for shadow
    textShadowRadius: 10, // Softness of shadow edges
  },
  exerciseLogModal: {
  flex: 1,
   backgroundColor: 'black',
   alignItems: 'center',
   justifyContent: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    
  },
  
  numberInput: {
    width: 190,
    height: 40,
    paddingHorizontal: 10,
  },
  setContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    marginTop: 10,
  },
  numberInputWeight: {
    height: 50,
    width: 70,
    borderColor: '"#6E7E85"',
    paddingLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,
  },
  numberInputReps: {
    height: 50,
    width: 50,
    borderColor: '"#6E7E85"',
    paddingLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,
  },
  exerciseLogs: {
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    height: 120,
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 20,
    
    elevation: 10, // Increase for more shadow on Android
  
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    }
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
viewERButton: {
  backgroundColor: '#73ca87', // if you haven't defined it already
  borderColor: "black",
  borderWidth: 0, // No border width
  borderRadius: 20,
  padding: 10,
  width: 340,
  marginTop: 15,
  alignItems: 'center',
  justifyContent: 'center',

  // Android shadow properties
  elevation: 10, // Increase for more shadow on Android

  // iOS shadow properties
  shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.11,
		shadowRadius: 5,
},

insertERButton: {
  backgroundColor: '#73ca87', // if you haven't defined it already
  borderColor: "black",
  borderWidth: 0, // No border width
  borderRadius: 20,
  padding: 10,
  width: 340,
  marginTop: 30,
  alignItems: 'center',
  justifyContent: 'center',

  // Android shadow properties
  elevation: 10, // Increase for more shadow on Android

  // iOS shadow properties
  shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.11,
  shadowRadius: 5,
},
  insertERTextTitle:{
    marginTop: 70,
    marginBottom: 20,
    color: '#6E7E85',
    fontWeight: '700', // this might not work with custom fonts, you'd need a font file that represents the weight you want
    fontSize: 50,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  repsText:{
    color: "#6E7E85", 
    fontWeight:800, 
    marginLeft: 23,
    fontSize: 23,
  },
});

export default CalenderScreen;

