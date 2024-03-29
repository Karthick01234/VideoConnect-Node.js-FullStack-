const mysql = require("mysql2");

let connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "video",
  password: "",
  port: 3307,
});

module.exports = connection.promise();
