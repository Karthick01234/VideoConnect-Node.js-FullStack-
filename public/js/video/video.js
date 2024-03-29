import { eventListen } from "./main/event.js";
import { io } from "../socket.io.esm.min.js";
import { Offer } from "./main/offer.js";
import { Answer } from "./main/answer.js";

const value = parseInt(document.getElementById("secret").innerHTML);

eventListen();
const socket = sessionStorage.getItem("sessionID")
  ? io({
      query: { token: sessionStorage.getItem("sessionID"), dt: value },
    })
  : io({
      query: { dt: value },
    });

socket.on("welcome", (message) => {
  if (!sessionStorage.getItem("sessionID")) {
    sessionStorage.setItem("sessionID", message);
  }
  if (value === 0) {
    Offer(socket);
  } else {
    let id = prompt("Enter Meet Id");
    Answer(socket, id);
  }
});
