exports = module.exports = function (io_web, io_narumi) {

    io.on('connection', socket => {
        console.log('client connected: ', socket.client.id)

        socket.on('new_task', (message) => {
            console.log('message : ' + message)
            new_task = [message.toXcoord, message.toYcoord, 'B']
            console.log('new_task : ' + new_task)
            socket.emit('start_move', new_task)
        })

        socket.on('disconnect', () => {
            console.log('client disconnected')
        })
    })
}