// ./web-app/server/config/database.js

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: '13.209.49.139',
  user: 'db_user01',
  password: '159753',
  port: '3306',
  database: 'naruda_db01',
  insecureAuth: true
}, function (err) {
  console.log(err);
});

module.exports = connection