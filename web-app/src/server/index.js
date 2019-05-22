// ./web-app/server/index.js

const express = require('express')
const socketIO = require('socket.io')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const mysql = require('mysql')
// const dbconfig   = require('./config/database.js')
// const connection = mysql.createConnection(dbconfig)
const PORT = process.env.PORT || 3000

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.use('/', express.static(__dirname + '/../../dist'));

app.post('/signin', function (req, res) {
  var email=req.body.email;
  var password=req.body.password;
  if(email=='admin' && password=='admin'){
  	res.send('success');
  }
  else{
  	res.send('Failure');
  }
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