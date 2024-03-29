import { servers, localVideo, remoteVideo } from "./variable.js";
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;
let offerDescription = null;
export async function Answer(socket, id) {
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
    console.log("dgfg");
    event.candidate && socket.emit("answer", event.candidate.toJSON());
  };

  socket.emit("id", id, async (acknowledgement) => {
    offerDescription = acknowledgement;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    socket.emit("answerdescription", { answer });
  });

  socket.on("onshapshotoffer", (data) => {
    console.log("data");
    pc.addIceCandidate(new RTCIceCandidate(data));
    console.log("data");
  });
}
