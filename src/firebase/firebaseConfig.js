// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv7FgW4PTHhxWuWm2xmwdYal76xghIX6U",
  authDomain: "evoter-5cfc5.firebaseapp.com",
  projectId: "evoter-5cfc5",
  storageBucket: "evoter-5cfc5.firebasestorage.app",
  messagingSenderId: "267821263080",
  appId: "1:267821263080:web:dc3842c2f6ab38e043015d",
  measurementId: "G-K14Y48G1BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics};