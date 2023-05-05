import database from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase} from "firebase/database"

export async function writeData(path, data) {
  return set(ref(database, path), data)
    .then(() => {
      console.log("Data written successfully!");
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

export async function readData(path, callback) {
  const dataRef = ref(database, path);

  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  }, (error) => {
    console.error("Error reading data:", error);
  });
}

