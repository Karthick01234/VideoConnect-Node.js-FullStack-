const start = document.getElementById("startMeeting");
const end = document.getElementById("joinMeeting");

start.addEventListener("click", () => {
  location.href = "/startmeeting";
});
end.addEventListener("click", () => {
  location.href = "/joinmeeting";
});
