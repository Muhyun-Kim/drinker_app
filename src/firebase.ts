// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG44dmZD4VnvjecG25M5lufJklPXDCg2k",
  authDomain: "drinker-8c793.firebaseapp.com",
  projectId: "drinker-8c793",
  storageBucket: "drinker-8c793.appspot.com",
  messagingSenderId: "628507954444",
  appId: "1:628507954444:web:c954e33a5e39cc73884d29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);