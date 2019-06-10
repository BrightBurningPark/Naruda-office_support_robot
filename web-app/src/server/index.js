// ./web-app/server/index.js

const express = require('express')
const socketIO = require('socket.io')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const con = require('./config/database.js')
const PORT_WEB = process.env.PORT_WEB || 3000
const PORT_NARUMI = process.env.NARUMI || 3010

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static(__dirname + '/../../dist'));

app.post('/signin', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log('signin request, email: ' + email + ' password: ' + password)
  var sql = "select * from naruda_db01.user_table where email_addr = ? and password = ?"

  con.query(sql, [email, password], function (err, rows) {
    if (rows.length > 0) {
      res.send(true);
      console.log('사용자 찾음');
    } else {
      res.send(false);
      console.log('사용자 찾지 못함');
    }
  });
})

app.post('/signup', function (req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var sqlCheckEmail = "SELECT * FROM naruda_db01.user_table WHERE email_addr = ?"
  var sqlSignup = "INSERT INTO naruda_db01.user_table (`email_addr`, `name`, `password`) VALUES (?, ?, ?);"

  console.log('signin request, email: ' + email + ' name: ' + name + ' password: ' + password)

  // 중복 메일 check
  con.query(sqlCheckEmail, [email], function (err, rows) {
    if (err) {
      console.log(err)
      return
    }
    if (rows.length > 0) {
      console.log('이미 등록된 이메일');
      res.send('email_error');
    }
    else {
      con.query(sqlSignup, [email, name, password], function (err, rows) {
        if (err) {
          console.log(err)
          return
        }
        console.log('회원가입 성공');
        res.send('signup_success');
      });
    }
  });
})

const server_web = app.listen(PORT_WEB, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on PORT_WEB: %s', PORT_WEB)
})
const io_web = new socketIO(server_web)

const server_narumi = app.listen(PORT_NARUMI, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on PORT_NARUMI: %s', PORT_NARUMI)
})
const io_narumi = new socketIO(server_narumi)

const task_manager = require('./TaskManager')(io_web, io_narumi)

// const test_manager = require('./TestManager')(io_web)