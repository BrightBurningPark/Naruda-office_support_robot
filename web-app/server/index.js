// ./web-app/server/index.js

const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000
// const socketEvents = require('./socketEvents')(io);

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../dist/index.html')
});

io.on('connection', socket => {
    console.log('client connected: ', socket.client.id)

    socket.on('disconnect', () => {
        console.log('client disconnected')
    })
})

server.listen(PORT, () => console.log(`listening on *: ${PORT}`))