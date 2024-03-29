const video = require("../model/video");

function vidroutes(socket, sessionId, dt) {
  if (dt === 0) {
    console.log("start");
    const vid = new video(null);
    console.log(vid);
    let id = vid.init();
    console.log(id);
    socket.emit("id", id);
    socket.on("offer", (offer) => {
      vid.adddoc(offer);
      console.log("offer");
    });
    socket.on("offerdescription", (offerdes) => {
      vid.updateorsetdoc(offerdes);
      console.log("offerdes");
    });
    vid.checkdoc(socket);
    vid.checkanswer(socket);
  } else {
    let vid = null;
    socket.on("id", (id, callback) => {
      vid = new video(id);
      vid
        .init()
        .then((receivedoffer) => {
          console.log("start");
          callback(receivedoffer);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    socket.on("answer", (answer) => {
      console.log("answer");
      vid.adddoc(answer);
    });
    socket.on("answerdescription", (answerdes) => {
      console.log("answerdescription");
      vid.updateorsetdoc(answerdes);
      vid.checkoffer(socket);
    });
  }
}
module.exports = vidroutes;
