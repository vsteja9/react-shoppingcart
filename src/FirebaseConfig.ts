// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlIGF8NtyAg0YcRUqAXhX_MoS3V6AP8a0",
  authDomain: "login-auth-56699.firebaseapp.com",
  projectId: "login-auth-56699",
  storageBucket: "login-auth-56699.appspot.com",
  messagingSenderId: "155557158632",
  appId: "1:155557158632:web:27b66582f7889ac903335d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
export default app;
