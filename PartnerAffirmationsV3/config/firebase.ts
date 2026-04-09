import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseWebConfig = {
  apiKey: "AIzaSyAbKuTriDZ0I-3spXsVgo-6X037rjzMW0M",
  authDomain: "partner-affirmations.firebaseapp.com",
  databaseURL: "https://partner-affirmations-default-rtdb.firebaseio.com",
  projectId: "partner-affirmations",
  storageBucket: "partner-affirmations.firebasestorage.app",
  messagingSenderId: "991512802310",
  appId: "1:991512802310:web:4890b12eb10a296f7a3f87",
  measurementId: "G-9GKM3RQW3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseWebConfig);

// Initialize services
export const auth = getAuth(app);
export const firestore = getFirestore(app);