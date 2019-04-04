exports = module.exports = function (io) {

    io.on('connection', socket => {
        console.log('client connected: ', socket.client.id)

        socket.on('disconnect', () => {
            console.log('client disconnected')
        })
    })

}