const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const uuid = require("uuid");
const users = require("./model/video/user");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  let sessionId;
  if (socket.handshake.query.token) {
    sessionId = socket.handshake.query.token;
  } else {
    sessionId = uuid.v4();
    socket.emit("welcome", sessionId);
  }
  const user = new users(sessionId, socket.id);
  user
    .save()
    .then(() => {
      console.log("Insert Successfull");
    })
    .catch((err) => {
      console.log(err);
    });
  socket.on("disconnect", () => {
    console.log("disconnect");
    user
      .delete(sessionId)
      .then(() => {
        console.log("Delete Successfull");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get("/", (req, res, next) => {
  res.render("home/home");
});

app.get("/startmeeting", (req, res, next) => {
  res.render("video/video", {
    dt: 0,
  });
});

app.get("/joinmeeting/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.render("video/video", {
    dt: 1,
  });
});

server.listen(port, () => {
  console.log("Port listening on 8000");
});
