import { eventListen } from "./main/event.js";
import { io } from "../socket.io.esm.min.js";
const value = parseInt(document.getElementById("secret").innerHTML);

eventListen();
let socket = "";
if (sessionStorage.getItem("sessionID")) {
  socket = io({
    query: { token: sessionStorage.getItem("sessionID") },
  });
} else {
  socket = io();
}
socket.on("welcome", (message) => {
  sessionStorage.setItem("sessionID", message);
  console.log(sessionStorage.getItem("sessionID"));
});

if (value === 0) {
  console.log("hii");
} else {
  console.log("hey");
}
