// import { import when needed
//   collection,
//   getDoc,
//   addDoc,
//   setDoc,
//   onSnapshot,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
import DB from "../data/nosqldbdb";

const init = DB();
const db = init.getDB();
