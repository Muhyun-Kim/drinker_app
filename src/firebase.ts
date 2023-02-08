// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
export const storage = getStorage(app);
export const storageRef = ref(storage);
