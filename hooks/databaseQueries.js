import {database} from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase, update, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database"
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



export function writeNewPost(childKey, childData) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    [childKey]: childData,
  };

  // Set the path for the new post
  const path = 'DatesBoolean/2023-05-05';

  // Write the new post's data at the specified path
  return update(ref(db, path), postData);
}



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
//:3

