import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA8HJqyptlNMJxojqQt5wwIXgfewVXYBEA",
    authDomain: "cs180-db.firebaseapp.com",
    projectId: "cs180-db",
    storageBucket: "cs180-db.appspot.com",
    messagingSenderId: "943556470766",
    appId: "1:943556470766:web:3cbd5eac5b1430cb9ed0ff"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

