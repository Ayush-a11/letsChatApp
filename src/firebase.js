// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjQl-E9kt0HWAPMNNcoHlAnLLO2BZv09U",
  authDomain: "letschatapp-bbf77.firebaseapp.com",
  projectId: "letschatapp-bbf77",
  storageBucket: "letschatapp-bbf77.appspot.com",
  messagingSenderId: "967609583706",
  appId: "1:967609583706:web:93ecbb7ae36827149e7063",
  measurementId: "G-Y4H4N4T2EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth=getAuth();
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export default db
export {provider,auth}