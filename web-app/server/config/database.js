// ./web-app/server/config/database.js

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'db-user',
  password: '12345678'
});

connection.connect();

//connection.end();

module.exports = connection;