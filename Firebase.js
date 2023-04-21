// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database" // For Database Connections

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
  