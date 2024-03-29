const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const uuid = require("uuid");
const users = require("./model/user");
const vidroutes = require("./routes/vidroutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", async (socket) => {
  let sessionId;
  let dt;
  if (socket.handshake.query.token) {
    sessionId = socket.handshake.query.token;
    dt = parseInt(socket.handshake.query.dt);
    socket.emit("welcome", sessionId);
  } else {
    sessionId = uuid.v4();
    dt = parseInt(socket.handshake.query.dt);
    socket.emit("welcome", sessionId);
  }
  const user = new users(sessionId, socket.id);
  await user
    .save()
    .then(() => {
      console.log("Insert Successfull");
    })
    .catch((err) => {
      console.log(err);
    });

  vidroutes(socket, sessionId, dt);

  socket.on("disconnect", async () => {
    console.log("disconnect");
    await user
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

app.get("/joinmeeting", (req, res, next) => {
  res.render("video/video", {
    dt: 1,
  });
});

server.listen(port, () => {
  console.log("Port listening on 8000");
});
