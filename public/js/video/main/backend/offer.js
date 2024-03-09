import { servers } from "../variable.js";
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;
export async function Offer() {
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

  // webcamVideo.srcObject = localStream;
  // remoteVideo.srcObject = remoteStream;

  // const callDoc = doc(collection(firestore, "calls"));
  // const offerCandidates = collection(callDoc, "offerCandidates");
  // const answerCandidates = collection(callDoc, "answerCandidates");

  // console.log(callDoc.id);

  pc.onicecandidate = (event) => {
    event.candidate && socket.emit("candidate", event.candidate); //addDoc(offerCandidates, event.candidate.toJSON());
  };

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  socket.emit("doc", { offer }); // await setDoc(callDoc, { offer });

  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}
