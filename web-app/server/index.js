// ./web-app/server/index.js

const express = require('express')
const path = require('path')
const socketIO = require('socket.io')
const app = express()

const PORT = process.env.PORT || 3000
// const socketEvents = require('./socketEvents')(io);

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../dist/index.html')
});

const server = app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('server listening on port: %s', PORT);
  });
  
const io = new socketIO(server)
const socketEvents = require('./socketEvents')(io);