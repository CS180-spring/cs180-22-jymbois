import {database} from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase, update, onChildAdded, onChildChanged, onChildRemoved, remove, onValue} from "firebase/database"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from "../configuration/firebaseConfig"; //	Firebase Operations
//Function to write data into the database
/*
let data1 = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
};
*/
//To call this function:  writeData("users/user1", data);
export function writeUserData(path, uid, data) {
  const db = getDatabase();
  let testData = {
    [uid]: data,
  }
  update(ref(db, path),testData);
}
export function createExersisePath(path, exerciseName) {
  const db = getDatabase();
  let testData = {
    [exerciseName]: "",
  }
  update(ref(db, path),testData);
}
export async function createSet(path, setInfo, _setData){
  const db = getDatabase();
  let setData ={
    [setInfo]: _setData,
  }
  update(ref(db, path),setData);
}
//const path1 = "DatesExerciseLogs/2023-05-05/5StlXUIxmPMGgzFFvXPF0RKICcu1";
//      createExersisePath(path1,"Deadlift" );

//writeNewPost('5StlXUIxmPMGgzFFvXPF0RKICcu1', 'true');
//Function to readData from real-time firebase
//to use this function readData()
export async function readData(path) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) {
      //console.log(snapshot.val());
      let object = snapshot.val();
      return Promise.resolve(object);
    } else {
      console.log("No data available");
      return Promise.resolve("Undefined");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

//This function is to check if user have a workout log on DatesBooleans array
export async function checkWorkoutLogs(date, uid){
  try {
    const obj = await readData("DatesBoolean/" + date + "/" + uid );
    //const keys = Object.keys(obj);
    //console.log(obj);
    return obj;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//checkWorkoutLogs("2023-05-05", "5StlXUIxmPMGgzFFvXPF0RKICcu1");


//Since checkWorkoutLogs is an asynchronous, I have to use try and catch, then use await
/*
(async function() {
  try {
    const result = await checkWorkoutLogs("2023-05-05", "5StlXUIxmPMGgzFFvXPF0RKICcu1");
    if (result === "true") {
      console.log("successful");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
*/

//This function is to retrieve data from real-time firebase
//Store returned datas inside an array so I can generate Uis for them
export async function retrieveExercises(date, uid){
  try {
    const obj = await readData("DatesExerciseLogs/" + date + "/" + uid );
    //console.log(obj);
    //const keys = Object.keys(obj);
    //console.log();
    return obj;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


export async function generateUIs1(date, uid) {
  try {
    const exercises = await retrieveExercises(date, uid);
    //console.log(exercises);
    for (const [exercise, sets] of Object.entries(exercises)) {
      console.log(`Exercise: ${exercise}`);
      
      for (const [setName, setDetails] of Object.entries(sets)) {
        console.log(`  ${setName}: ${setDetails.reps} reps at ${setDetails.weight} lbs`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//These helper functions are for editing or deleting an exercise record
//

//Helper function to delete a whole exercise log including all sets

//Helper function to delete a whole exercise log including all sets
export async function deleteER(path){
  const db = getDatabase();
  
  await remove(ref(db, path))
    .then(() => console.log("Exercise Record removed!"))
    .catch(error => console.error("Error removing data:", error));
}


//Helper function to delete only 1 set inside of an exercise
//Helper function to edit exercise name, each set name, each set informations

//This function is to check if the current path has only 1 child left
//Helper function to remove set and exercise records
export async function hasOnlyOneChild(path) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) {
      const data = snapshot.val();
      const numOfChildren = Object.keys(data).length;
      return numOfChildren === 1 ? "true" : "false";
    } else {
      console.log("No data available");
      return "false";
    }
  } catch (error) {
    console.error("An error occurred while checking the number of children:", error);
    throw error; // or return some default value
  }
};

/*
async function testFunction() {
  try {
    const result = await hasOnlyOneChild("DatesExerciseLogs/2023-05-20/KXJjbxWERaggJmj5tcszDGbXxe22/");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

testFunction();
*/

//This function is to change each set info of a exercise
export async function editSet(path, newReps, newWeight) {
  const db = getDatabase();
  let testData = {
    reps: newReps,
    weight:  newWeight,
  }
  update(ref(db, path),testData);
}

//editSet("/DatesExerciseLogs/2023-05-20/KXJjbxWERaggJmj5tcszDGbXxe22/Tricep Extension/set 1/", "25", "60" );
// Code for retrieving isPushEnabled

export async function retrieveIsPush(){
  const user = auth.currentUser.uid;
  try {
    const obj = await readData("users/" + user + "/isPushEnabled");
    console.log("This is IsPush: ", obj);
    return obj;

  } catch(error){
    console.error("Error: ", error);
    writeIsPush(false);
    return false;
  }
}
export function writeIsPush(value) {
  const user = auth.currentUser.uid;
  const db = getDatabase();
  const path = "users/" + user+ "/isPushEnabled"; 
  return set(ref(db, path), value);
}


export function writeUserImageUri(uid, uri) {
  const db = getDatabase();
  let testData = {
    imageUri: uri,
  }
  update(ref(db, `users/${uid}`), testData);
}

export async function readUserImageUri(uid) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${uid}`));

    if (snapshot.exists()) {
      let object = snapshot.val();
      if ('imageUri' in object) {
        return Promise.resolve(object.imageUri);
      } else {
        console.log("No imageUri available for user");
        return Promise.resolve("");
      }
    } else {
      console.log("No data available for user");
      return Promise.resolve("");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// Function to store user's weight
export function writeUserWeight(uid, weight) {
  const db = getDatabase();
  const path = `users/${uid}/weightHistory`;
  const timestamp = Date.now();

  let weightData = {
    [timestamp]: weight,
  }

  return update(ref(db, path), weightData);
}
// Function to get the most recent user's weight
export async function getCurrentWeight(uid) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${uid}/weightHistory`));

    if (snapshot.exists()) {
      let weightHistory = snapshot.val();
      let latestTimestamp = Math.max(...Object.keys(weightHistory));
      return Promise.resolve(weightHistory[latestTimestamp]);
    } else {
      console.log("No data available");
      return Promise.resolve("Undefined");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// this for the  graph screen so we can store all the weight history stored in there to the graph
// Function to get all weights for a user
export async function getWeightHistory(uid) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${uid}/weightHistory`));

    if (snapshot.exists()) {
      return Promise.resolve(snapshot.val());
    } else {
      console.log("No data available");
      return Promise.resolve({});
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}


// writing queries for isDark

export async function retrieveIsDark(){
  const user = auth.currentUser.uid;
  try{
    const obj = await readData("users/" + user + "/isDarkEnabled");
    console.log("This is isDark: " ,obj);
    return obj;
  }
  catch(error){
    console.log("Error: ", error);
    writeIsDark(false);
    return false;
  }
}

export function writeIsDark(value){
  const user = auth.currentUser.uid;
  const db = getDatabase();
  const path = "users/" + user + "/isDarkEnabled";
  return set(ref(db, path), value);
}

//function to store goal weight 

export function writeGoalWeight(uid, goalWeight){
 const db = getDatabase();
  const path = `users/${uid}/goalWeight`;
  const timestamp = Date.now();

  let goalWeightData = {
    [timestamp]: goalWeight,
  }
  return update(ref(db, path), goalWeightData);
}


export async function getGoalWeight(uid){
  try{
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${uid}/goalWeight`));
    if(snapshot.exists()){
      console.log("This is goal weight: ", snapshot.val());
      return Promise.resolve(snapshot.val());
    }
    else {
      console.log("No data available");
      return Promise.resolve({});
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export function updateWeight(value){
  const user = auth.currentUser.uid;
  const db = getDatabase();
  const path = "users/" + user + "/weight";
  return set(ref(db,path), value);
}
  
generateUIs1("2023-05-08","KXJjbxWERaggJmj5tcszDGbXxe22");

