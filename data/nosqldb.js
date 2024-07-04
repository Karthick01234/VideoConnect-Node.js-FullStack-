const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const firebaseConfig = {
  // config values
};
const app = firebase.initializeApp(firebaseConfig);
let db = () => {
  return firestore.getFirestore(app);
};
module.exports = db;
