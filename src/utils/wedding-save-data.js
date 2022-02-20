

// Initialize Cloud Firestore through Firebase
// import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";


const db = getFirestore();

export default async function saveToFirebase(data) {
  console.log(data)
  try {
    const docRef = await addDoc(collection(db, "wedding"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}