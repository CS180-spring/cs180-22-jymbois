import {database} from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase, onValue} from "firebase/database"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//Function to write data into the database
//let data = {
//  name: "John Doe",
//  email: "john.doe@example.com",
//  age: 30,
//};
//To call this function:  writeData("users/user1", data);
export async function writeData(path, data) {
  return set(ref(database, path), data)
    .then(() => {
      console.log("Data written successfully!");
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

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

readData("users/users")
  .then((userData) => {
    console.log(userData.email);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });




