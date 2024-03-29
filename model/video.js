const firebase = require("../data/nosqldb");
const db = firebase();
const firestore = require("firebase/firestore");

class Video {
  constructor(id) {
    this.id = id;
  }
  init() {
    if (this.id) {
      this.doc = firestore.doc(db, "videodb", this.id);
      this.answers = firestore.collection(this.doc, "answers");
      this.offers = firestore.collection(this.doc, "offers");
      console.log("this.doc");
      return firestore
        .getDoc(this.doc)
        .then((doc) => {
          this.callData = doc.data();
          console.log("this.callData");
          return this.callData.offer;
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      this.doc = firestore.doc(firestore.collection(db, "videodb"));
      this.offers = firestore.collection(this.doc, "offers");
      this.answers = firestore.collection(this.doc, "answers");
      return this.doc.id;
    }
  }
  adddoc(value) {
    if (this.id) {
      firestore.addDoc(this.answers, value);
    } else {
      firestore.addDoc(this.offers, value);
    }
  }
  updateorsetdoc(value) {
    if (this.id) {
      firestore.updateDoc(this.doc, value);
    } else {
      firestore.setDoc(this.doc, value);
    }
  }
  checkdoc(socket) {
    firestore.onSnapshot(this.doc, (snapshot) => {
      socket.emit("snapshotdoc", snapshot.data());
    });
  }
  checkanswer(socket) {
    firestore.onSnapshot(this.answers, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let value = change.doc.data();
          socket.emit("snapshotanwer", value);
        }
      });
    });
  }
  checkoffer(socket) {
    firestore.onSnapshot(this.offers, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let value = change.doc.data();
          socket.emit("onshapshotoffer", value);
        }
      });
    });
  }
}
module.exports = Video;
