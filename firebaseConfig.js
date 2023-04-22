import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8HJqyptlNMJxojqQt5wwIXgfewVXYBEA",
    authDomain: "cs180-db.firebaseapp.com",
    projectId: "cs180-db",
    storageBucket: "cs180-db.appspot.com",
    messagingSenderId: "943556470766",
    appId: "1:943556470766:web:3cbd5eac5b1430cb9ed0ff",
    databaseURL: "gs://cs180-db.appspot.com"
  };
  
  // Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };