export function endCall() {
  alert("Ending call");
}

export function toggleMic() {
  alert("Toggling microphone");
}

export function toggleCamera() {
  alert("Toggling camera");
}

export function toggleCameraMute() {
  alert("Toggling camera mute");
}

export function copyToClipboard() {
  navigator.clipboard
    .writeText(sessionStorage.getItem("code"))
    .then(() => {
      console.log("Text copied to clipboard:");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
