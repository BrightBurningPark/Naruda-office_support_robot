// ./web-app/server/config/database.js

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'db_user01',
  password: '159753',
  port: '3306',
  database: 'naruda_db01',
  insecureAuth : true
})

connection.connect();

module.exports = connection