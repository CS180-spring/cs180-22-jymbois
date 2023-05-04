import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import  Calendar  from 'react-native-calendars/src/calendar';
import ThemeContext from "../hooks/ThemeContext";

const createThemedStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin: 20,
    },
    button1: {
      backgroundColor: isDarkMode ? '#7d5a4f' : 'tan',
      borderRadius: 10,
      margin: 40,
      padding: 10,
      width: 1000,
      alignItems: 'center',
    },
    button2: {
      backgroundColor: isDarkMode ? '#7d5a4f' : 'tan',
      borderRadius: 10,
      margin: 40,
      padding: 10,
      width: 100,
      alignItems: 'center',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      maxWidth: '100%',
    },
    buttonText: {
      color: isDarkMode ? 'white' : 'white',
      fontSize: 22,
    },
    calendarModal: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendar: {
      borderRadius: 10,
      elevation: 4,
      width: '100%',
      maxWidth: 400,
      maxHeight: 600,
    },
    titleText: {
      color: isDarkMode ? '#ccc' : 'tan',
      fontWeight: 800,
      fontSize: 15,
      marginLeft: 5,
    },
    exerciseLogModal: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: isDarkMode ? '#7d5a4f' : 'tan',
      borderRadius: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    numberInput: {
      width: 170,
      height: 40,
      borderWidth: 1,
      borderColor: isDarkMode ? '#7d5a4f' : 'tan',
      paddingHorizontal: 10,
      textColor: isDarkMode ? '#7d5a4f' : 'tan',
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
      borderColor: isDarkMode ? '#7d5a4f' : 'tan',
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
      borderColor: isDarkMode ? '#7d5a4f' : 'tan',
      fontWeight:800,
    },
  });
};


const CalenderScreen = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const styles = createThemedStyles(isDarkMode);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [recordDate, setRecordDate] = useState("");
  const [text, onChangeText] = React.useState('');
  const [nameOfExercise, setNameOfExercise] = useState('');
  const [setNumbers, setSetNumbers] = useState(0);
  
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
  const handleDayPress = (day) => {
    //console.log(day.dateString);
    setRecordDate(day.dateString);
    console.log(recordDate);
    setShowModal1(false);
    setShowModal2(true);
  };

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
        onChangeText={onChangeText}
        value={text}

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
        onPress={exitCalendarModal}
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

export default CalenderScreen;