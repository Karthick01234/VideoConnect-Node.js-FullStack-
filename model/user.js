const db = require("../data/sqldb");

class user {
  constructor(uuid, socketID) {
    this.uuid = uuid;
    this.socketID = socketID;
  }
  save() {
    return db.execute("INSERT INTO users (uuid, socketId) VALUES (?, ?)", [
      this.uuid,
      this.socketID,
    ]);
  }
  delete(id) {
    return db.execute("DELETE FROM users WHERE uuid=(?)", [id]);
  }
}
module.exports = user;
