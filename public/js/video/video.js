import { eventListen } from "./main/event.js";
import { io } from "../socket.io.esm.min.js";
const value = parseInt(document.getElementById("secret").innerHTML);

eventListen();
const socket = io();

window.onvisibilitychange = () => {
  if (window.onvisibilitystate == "hidden") {
    alert("hii");
  }
};

if (value === 0) {
  console.log("hii");
} else {
  console.log("hey");
}
