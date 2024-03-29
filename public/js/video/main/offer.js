import { servers, localVideo, remoteVideo } from "./variable.js";
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;
export async function Offer(socket) {
  socket
    .on("id", (id) => {
      sessionStorage.setItem("code", id);
    })
    .on("error", (error) => {
      console.error("Socket error:", error);
    });
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  remoteStream = new MediaStream();

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  localVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  pc.onicecandidate = (event) => {
    event.candidate && socket.emit("offer", event.candidate.toJSON());
  };

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  socket.emit("offerdescription", { offer });

  socket.on("snapshotdoc", (data) => {
    if (!pc.currentRemoteDescription && data?.answer) {
      console.log("oneshot");
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });
  socket.on("snapshotanwer", (data) => {
    console.log("data");
    pc.addIceCandidate(new RTCIceCandidate(data));
    console.log("fdata");
  });
}
