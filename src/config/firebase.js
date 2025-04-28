// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- you need Firestore, not Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAPqdubW64ivU2dI8oDcDrl2uncLsvyzI",
  authDomain: "budget-tracker-8a5e2.firebaseapp.com",
  projectId: "budget-tracker-8a5e2",
  storageBucket: "budget-tracker-8a5e2.appspot.com", // <-- small typo fixed: ".app" -> ".app**spot.com**"
  messagingSenderId: "118138616816",
  appId: "1:118138616816:web:0d4145bf854b63b2f73b35",
  measurementId: "G-LNXXB49E4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db so you can use it in your app
export { db };
