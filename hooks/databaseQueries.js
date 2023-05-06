import {database} from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase, onValue} from "firebase/database"
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
  set(ref(db, path),testData);
}
export function createExersisePath(path, exerciseName) {
  const db = getDatabase();
  let testData = {
    [exerciseName]: "",
  }
  set(ref(db, path),testData);
}
export function createSet(path, setInfo, _setData){
  const db = getDatabase();
  let setData ={
    [setInfo]: _setData,
  }
  set(ref(db, path),setData);
}
const path1 = "DatesExerciseLogs/2023-05-05/5StlXUIxmPMGgzFFvXPF0RKICcu1";
      createExersisePath(path1,"Deadlift" );
//Function to readData from real-time firebase
//to use this function readData()
export async function readData(path) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) {
      console.log(snapshot.val());
      let object = snapshot.val();
      return Promise.resolve(object);
    } else {
      console.log("No data available");
      return Promise.resolve("No data available");
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}





//Have to use await/promise and await for async function, else will not be able to read data
/*
readData("users/users")
  .then((userData) => {
    console.log(userData.email);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
*/






