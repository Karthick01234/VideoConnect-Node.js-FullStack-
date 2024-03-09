const start = document.getElementById("startMeeting");
const end = document.getElementById("joinMeeting");

start.addEventListener("click", () => {
  location.href = "/startmeeting";
});
end.addEventListener("click", () => {
  let id = prompt("Enter Meet Id");
  location.href = "/joinmeeting/" + id;
});
