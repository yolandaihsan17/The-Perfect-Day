import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from 'firebase/auth'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmEVBrTxhul461AILBC6EuVWarMib4xQc",
  authDomain: "the-flawless-day.firebaseapp.com",
  projectId: "the-flawless-day",
  storageBucket: "the-flawless-day.appspot.com",
  messagingSenderId: "527562017027",
  appId: "1:527562017027:web:e4b796e76480866e0dc136",
  measurementId: "G-CQ6ZMHKZGT"
};


export default function initFirebase() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const auth = getAuth(app)
}