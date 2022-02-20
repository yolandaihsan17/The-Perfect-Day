// import { getDatabase, ref, child, get } from "firebase/database";
// import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"

export default async function getWedding(id) {
  const db = getFirestore();

  const q = query(collection(db, "wedding"), where("id", "==", id));
  
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.data())
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.data());
  //   return doc.data()
  // });

  return querySnapshot
}
