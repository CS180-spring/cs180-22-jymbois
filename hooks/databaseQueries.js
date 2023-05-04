import database from "../configuration/firebaseConfig";
import { ref, set, child, get, getDatabase} from "firebase/database"

function writeUserData(userId, eMail, g, p, u) {
    set(ref(database, 'users/' + userId), {
      email: eMail,
      gender: g,
      password : p,
      uname: u
    });
}
let userId = "5StlXUIxmPMGgzFFvXPF0RKICcu1";
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


writeUserData(userId, "ttran456@gmail.com", "neutral", "pass", "boney171");

