import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8HJqyptlNMJxojqQt5wwIXgfewVXYBEA",
    authDomain: "cs180-db.firebaseapp.com",
    projectId: "cs180-db",
    storageBucket: "cs180-db.appspot.com",
    messagingSenderId: "943556470766",
    appId: "1:943556470766:web:3cbd5eac5b1430cb9ed0ff",
    databaseURL: "https://cs180-db-default-rtdb.firebaseio.com/"
  };
  
  // Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

//  Export auth token
const database = getDatabase(firebaseApp);
export default database;


export const auth = firebase.auth();

//  Use this function to Sign up a new user with an email and password strings
export function signUp(name, pw)
{
  auth.createUserWithEmailAndPassword(name, pw)
          .then((userCredential) => { //  Signed in 
            const user = userCredential.user;
            console.log(user.email);
          }).catch((error) => { //  Error
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
          })
}

