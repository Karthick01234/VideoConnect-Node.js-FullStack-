import * as val from "./variable.js";
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

export function eventListen() {
  val.localVideo.addEventListener("mousedown", (e) => {
    startDrag(e, localVideo);
  });
  val.localVideo.addEventListener("mouseup", (e) => {
    stopDrag();
  });
  val.localVideo.addEventListener("mousemove", (e) => {
    performDrag(e, localVideo, dropdown);
  });
  val.localVideo.addEventListener("touchstart", (e) => {
    startTouchDrag(e, localVideo);
  });
  val.localVideo.addEventListener("touchend", (e) => {
    stopTouchDrag();
  });
  val.localVideo.addEventListener("touchmove", (e) => {
    performTouchDrag(e, localVideo, dropdown);
  });
  val.slide.addEventListener("click", () => {
    toggleSlide(slide, slideSpace);
  });
  val.dropdown.addEventListener("click", () => {
    hide(localVideo);
  });
  val.call.addEventListener("click", () => {
    endCall();
  });
  val.mic.addEventListener("click", () => {
    toggleMic();
  });
  val.camera.addEventListener("click", () => {
    toggleCamera();
  });
  val.mutecamera.addEventListener("click", () => {
    toggleCameraMute();
  });
  val.clipboard.addEventListener("click", () => {
    copyToClipboard();
  });
}
