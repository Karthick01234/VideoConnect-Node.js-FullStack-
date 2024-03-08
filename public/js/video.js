import {
  endCall,
  toggleMic,
  toggleCamera,
  toggleCameraMute,
  copyToClipboard,
} from "./frontend/videocall.js";
import { hide, toggleSlide } from "./frontend/videohide.js";
import {
  startDrag,
  stopDrag,
  startTouchDrag,
  stopTouchDrag,
  performDrag,
  performTouchDrag,
} from "./frontend/videomovement.js";
const remoteVideo = document.getElementById("remoteVideo");
const slide = document.getElementById("slide");
const slideSpace = document.getElementById("slideSpace");
const localVideo = document.getElementById("localVideo");
const dropdown = document.getElementById("dropdown");
const call = document.getElementById("call");
const mic = document.getElementById("mic");
const camera = document.getElementById("camera");
const mutecamera = document.getElementById("mutecamera");
const clipboard = document.getElementById("clipboard");
localVideo.addEventListener("mousedown", (e) => {
  startDrag(e, localVideo);
});
localVideo.addEventListener("mouseup", (e) => {
  stopDrag();
});
localVideo.addEventListener("mousemove", (e) => {
  performDrag(e, localVideo, dropdown);
});
localVideo.addEventListener("touchstart", (e) => {
  startTouchDrag(e, localVideo);
});
localVideo.addEventListener("touchend", (e) => {
  stopTouchDrag();
});
localVideo.addEventListener("touchmove", (e) => {
  performTouchDrag(e, localVideo, dropdown);
});
slide.addEventListener("click", () => {
  toggleSlide(slide, slideSpace);
});
dropdown.addEventListener("click", () => {
  hide(localVideo);
});
call.addEventListener("click", () => {
  endCall();
});
mic.addEventListener("click", () => {
  toggleMic();
});
camera.addEventListener("click", () => {
  toggleCamera();
});
mutecamera.addEventListener("click", () => {
  toggleCameraMute();
});
clipboard.addEventListener("click", () => {
  copyToClipboard();
});
