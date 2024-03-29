const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyCiKGwYLkrDy6lgcllTMBczZw8YPjiMYv4",
  authDomain: "strategic-howl-345307.firebaseapp.com",
  projectId: "strategic-howl-345307",
  storageBucket: "strategic-howl-345307.appspot.com",
  messagingSenderId: "654264386210",
  appId: "1:654264386210:web:d7438d49b840ed64a00dfb",
  measurementId: "G-1XC3P5MV2R",
};
const app = firebase.initializeApp(firebaseConfig);
let db = () => {
  return firestore.getFirestore(app);
};
module.exports = db;
