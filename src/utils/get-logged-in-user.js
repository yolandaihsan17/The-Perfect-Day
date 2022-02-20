


// import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

export default function getUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user)
  return user
}


