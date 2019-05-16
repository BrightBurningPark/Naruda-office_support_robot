// ./web-app/server/index.js

const express = require('express')
const path = require('path')
const mysql = require('mysql')
const socketIO = require('socket.io')
const cors = require('cors')
const app = express()
// const dbconfig   = require('./config/database.js')
// const connection = mysql.createConnection(dbconfig)
const PORT = process.env.PORT || 3000

process.on('uncaughtException', function (err) {
  console.log(err);
});
  
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'static')));

app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on port: %s', PORT)
})

const io = new socketIO(server)
const socketEvents = require('./socketEvents')(io)