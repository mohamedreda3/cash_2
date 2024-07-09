// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSRudMi0dsJXbKPNeHJagGajN1u4g2TAA",
  authDomain: "ahmed-qash-c6550.firebaseapp.com",
  databaseURL: "https://ahmed-qash-c6550-default-rtdb.firebaseio.com/",
  projectId: "ahmed-qash-c6550",
  storageBucket: "ahmed-qash-c6550.appspot.com",
  messagingSenderId: "205860110047",
  appId: "1:205860110047:web:5cefe1e2104275cef2b36a",
  measurementId: "G-QVMX7MJVC9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // Initialize database instance

export { app, analytics, auth, firestore, database }; 
