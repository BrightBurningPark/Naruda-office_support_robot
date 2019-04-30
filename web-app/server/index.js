// ./web-app/server/index.js

const express = require('express')
const path = require('path')
const mysql = require('mysql')
const socketIO = require('socket.io')
const app = express()
// const dbconfig   = require('./config/database.js')
// const connection = mysql.createConnection(dbconfig)
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../dist/index.html')
})

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on port: %s', PORT)
})

const io = new socketIO(server)
const socketEvents = require('./socketEvents')(io)