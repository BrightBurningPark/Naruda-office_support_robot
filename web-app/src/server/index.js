// ./web-app/server/index.js

const express = require('express')
const socketIO = require('socket.io')
const app = express()
const cors = require('cors')
// const mysql = require('mysql')
// const dbconfig   = require('./config/database.js')
// const connection = mysql.createConnection(dbconfig)
const PORT = process.env.PORT || 3000

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());
  
app.use('/', express.static(__dirname + '/../../dist'));

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on port: %s', PORT)
})

const io = new socketIO(server)
const socketEvents = require('./socketEvents')(io)