const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "view");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("home/home");
});

app.get("/startmeeting", (req, res, next) => {
  res.render("video/video");
});

app.get("/joinmeeting/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.render("video/video");
});

app.listen(port, () => {
  console.log("Port listening on 8000");
});
