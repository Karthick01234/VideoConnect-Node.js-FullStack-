export const slide = document.getElementById("slide");
export const slideSpace = document.getElementById("slideSpace");
export const localVideo = document.getElementById("localVideo");
export const remoteVideo = document.getElementById("remoteVideo");
export const dropdown = document.getElementById("dropdown");
export const call = document.getElementById("call");
export const mic = document.getElementById("mic");
export const camera = document.getElementById("camera");
export const mutecamera = document.getElementById("mutecamera");
export const clipboard = document.getElementById("clipboard");
export const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
