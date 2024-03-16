import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
class DB {
  #firebaseConfig = {
    apiKey: "AIzaSyCiKGwYLkrDy6lgcllTMBczZw8YPjiMYv4",
    authDomain: "strategic-howl-345307.firebaseapp.com",
    projectId: "strategic-howl-345307",
    storageBucket: "strategic-howl-345307.appspot.com",
    messagingSenderId: "654264386210",
    appId: "1:654264386210:web:d7438d49b840ed64a00dfb",
    measurementId: "G-1XC3P5MV2R",
  };
  #app;
  DB() {
    this.#app = initializeApp(this.#firebaseConfig);
  }
  getDB() {
    return getFirestore(this.#app);
  }
}
module.exports = DB;
