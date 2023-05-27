import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { useEffect } from 'react';
import InputSpinner from 'react-native-input-spinner';
import  Calendar  from 'react-native-calendars/src/calendar';
import { writeUserData, createExersisePath, createSet, hasOnlyOneChild, editSet}  from "../hooks/databaseQueries";
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations
import  {readData, checkWorkoutLogs, retrieveExercises, deleteER}  from '../hooks/databaseQueries';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../hooks/ThemeContext';
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
  const [tempSets, setTempSets] = useState({});
  //dark mode
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
  const styles = createThemedStyles(isDarkMode);

  const updateTempSets = (setName, field, newValue) => {
    setTempSets(prevTempSets => ({
      ...prevTempSets,
      [setName]: {
        ...prevTempSets[setName],
        [field]: newValue === "" ? " " : newValue,
      },
    }));
  }

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
    setExerciseName("");
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
    setTempSets({});
  }

  
  const deleteExerciseRecord = async (exercise, date, uid) => {
    try {
      const pathParent = "DatesExerciseLogs/" + date + "/" + uid;
      const pathChild = "DatesExerciseLogs/" + date + "/" + uid + "/" + exercise + "/";
      const oneChild = await hasOnlyOneChild(pathParent);

      console.log(oneChild);
      if(oneChild === "true"){
        let path1 = "DatesBoolean/" + recordDate + "/";
        writeUserData(path1, uid, "false");
        setHasWorkout(false);
        setExercises({});
        await deleteER(pathParent);
      } else {
        await deleteER(pathChild);
        const exercises = await retrieveExercises(recordDate, auth.currentUser.uid);
        setExercises(exercises);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteSet = async (exercise, set , date, uid) => {
    try {
      const pathParent1 = "DatesExerciseLogs/" + date + "/" + uid + "/";
      const pathParent2 = "DatesExerciseLogs/" + date + "/" + uid + "/" + exercise;
      const pathChild = "DatesExerciseLogs/" + date + "/" + uid + "/" + exercise + "/" + set + "/";
      const oneChild = await hasOnlyOneChild(pathParent1 );
      const oneChildSet = await hasOnlyOneChild(pathParent2);
      console.log(pathChild);
      console.log(pathParent2);
      console.log("This exercise is the last exercise", oneChild );
     console.log("This set is the last set of the exercise", oneChildSet );
      if(oneChild === "true" && oneChildSet === "true"){
        let path1 = "DatesBoolean/" + recordDate + "/";
        writeUserData(path1, uid, "false");
        setHasWorkout(false);
        setExercises({});
        await deleteER(pathParent2);
      } else {
        await deleteER(pathChild);
        const exercises = await retrieveExercises(recordDate, auth.currentUser.uid);
        setExercises(exercises);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const editSetInfo = async (date, uid, exercise, set, newReps, newWeight) => {
    try {
      const path = "DatesExerciseLogs/" + date + "/" + uid + "/" + exercise + "/" + set + "/";
      await editSet(path, newReps, newWeight);
    

    } catch (error) {
      console.error(error);
    }
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
         style={{ ...styles.calendar, backgroundColor:  isDarkMode ? "#000" : "#FFFFFF"}} 
         onDayPress={handleDayPress}
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
          textSectionTitleColor: "grey", // Changes the color of weekday names (Mon, Tue, etc.) Doesn fucking work just staying with grey
          dayTextColor: "black",
          monthTextColor:"grey", // Changes the color of the month name dark mode Doesn fucking work just staying with grey
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
        <FontAwesome style={styles.viewERButtonLogo}name="search" size={45} color={isDarkMode ? '#000' : '#fff'}> </FontAwesome>
        <Text style={ styles.calendarButtonTextTop }>View</Text>
        <Text style={ styles.calendarButtonTextBottom }>Exercise Records</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={selectInsertExerciseRecord}
          style={styles.insertERButton}> 
           <AntDesign style={styles.insertERButtonLogo}name="pluscircleo" size={45} color={isDarkMode ? '#000' : '#fff'} />
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
        style = {{flex: 1, backgroundColor: isDarkMode ? "#000" : "#FFFFFF"}}
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
        <View style={{flex: 1,  backgroundColor:  isDarkMode ? '#000' : '#fff'}}> 
       <ScrollView>
       <View style={styles.returnButtonContainer}>
        <TouchableOpacity 
          onPress={exitExerciseRecordModal}
          style={styles.returnButtonViewERmodal}> 
          <FontAwesome name="calendar" size={35} color="white"> </FontAwesome>
        </TouchableOpacity>
       </View>
       
       {
        recordDate && (<Text style={ styles.viewERTextTitle}>{recordDate}</Text>)
       }

<View style={styles.exercisesBox}>
  { hasWorkout ? Object.entries(exercises).map(([exercise, sets], index) => (
    <View key={exercise} style = {styles.exerciseBoxes}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.exerciseTitleText, {color: "#6E7E85"}]}>{exercise}</Text>
        <TouchableOpacity onPress={ () =>  deleteExerciseRecord(exercise, recordDate ,auth.currentUser.uid) }>
          <FontAwesome name="times-circle" size={30} color="#900" />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: '#6E7E85', borderBottomWidth: 1, marginVertical: 5 }} />
      {Object.entries(sets).map(([setName, setDetails], index) => (
        <View key={index} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, color: "#6E7E85", fontWeight: 'bold'}}>
            {setName}:
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={{ marginBottom: 6, color: "black", fontWeight: 'bold'}}>Reps</Text>
            <TextInput
              style={{height: 40, width: 40, borderRadius: 20, borderColor: 'black', borderWidth: 1, marginHorizontal: 5, textAlign: 'center', color: "black"}}
              placeholder='Reps'
              value={tempSets[setName]?.reps || String(setDetails.reps)}
              keyboardType='numeric'
              onChangeText={(newReps) => updateTempSets(setName, 'reps', newReps)}
              onEndEditing={() => editSetInfo(recordDate, auth.currentUser.uid, exercise, setName, tempSets[setName]?.reps || setDetails.reps, tempSets[setName]?.weight || setDetails.weight)}
              placeholderTextColor="black"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{ marginBottom: 6, color: "black", fontWeight: 'bold'}}>Weight</Text>
            <TextInput
              style={{height: 40, width: 40, borderRadius: 20, borderColor: 'black', borderWidth: 1, marginHorizontal: 5, textAlign: 'center', color: "black"}}
              placeholder='Weight'
              keyboardType='numeric'
              value={tempSets[setName]?.weight || String(setDetails.weight)}
              onChangeText={(newWeight) => updateTempSets(setName, 'weight', newWeight)}
              onEndEditing={() => editSetInfo(recordDate, auth.currentUser.uid, exercise, setName, tempSets[setName]?.reps || setDetails.reps, tempSets[setName]?.weight || setDetails.weight)}
              placeholderTextColor="black"
            />
          </View>
          <TouchableOpacity onPress={() => deleteSet(exercise, setName , recordDate, auth.currentUser.uid)}>
            <FontAwesome name="close" size={25} color="#900" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )) : null}
</View>
       </ScrollView>
       </View>
      </Modal>


    </ScrollView>

  );
}
const createThemedStyles = (isDarkMode) => StyleSheet.create({
  body: {
    backgroundColor:  isDarkMode ? '#000' : '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#fff' : '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20,
  },
 
  returnButtonViewERmodal: {
    backgroundColor: '#6E7E85', 
    borderRadius: 10, 
    marginTop: '15%',
    marginLeft: '-70%',
    padding: 10,
    width: 53,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: isDarkMode ? "#FFF" : "#000", 
    fontSize: 22,
  },
  
  calendarButtonTextBottom: {
    color: isDarkMode ? "#000" : "#FFF", 
    fontSize: 18,
    marginTop: 5,
    marginRight: 130,
    paddingBottom: 6
  },
  calendarButtonTextTop: {
    color: isDarkMode ? "#000" : "#FFF", 
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
    color: isDarkMode ? '#fff' : '#000',
    marginTop: 30,
    marginBottom: 10,
  
    // Text shadow properties
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Very light shadow
    textShadowOffset: { width: -1, height: 1 }, // Offset for shadow
    textShadowRadius: 10, // Softness of shadow edges
  },
  exerciseLogModal: {
  flex: 1,
  backgroundColor: isDarkMode ? "#000" : "#FFFFFF",
   alignItems: 'center',
   justifyContent: 'center',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderColor: isDarkMode ? "#FFF" : "#000",
    borderRadius: 10,
    borderWidth: 1,
    color: isDarkMode ? "#FFF" : "#000",
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
    backgroundColor: isDarkMode ? "#000" : "#FFF",
  },
  numberInputWeight: {
    height: 50,
    width: 70,
    borderColor: "#6E7E85",
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
    borderColor: "#6E7E85",
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
    justifyContent: "space-evenly",
    alignItems: "center",
  // iOS shadow properties
    
},
exerciseBoxes: {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  width: "90%",
  marginLeft: "5%", // Center the box by adding equal left and right margins
  padding: 15,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: "#ddd", // Add a subtle border color
  backgroundColor: "#f9f9f9", // Light background color
  overflow: 'hidden',
  marginBottom: 15,
  // Android shadow properties
  elevation: 3, // Add elevation for Android
  // iOS shadow properties
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
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
  position: "relative",
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
    position: "relative",
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
  viewERTextTitle:{
    position: "relative",
    marginTop: 5,
    marginBottom: 5,
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
  insertERButtonLogo: {
    position: "absolute",
    left: "85%",
  },
  viewERButtonLogo:{
    position: "absolute",
    left: "85%",
  },
  exerciseTitleText: {
    fontWeight: 'bold', 
    fontSize: 23, 
    color: "#6E7E85", 
    marginBottom: 5,
  }
});

export default CalenderScreen;

