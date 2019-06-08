import Queue from './Queue'

var taskQueue = new Queue()
/*
 * queue의 object는 {
     fromXCoord: '',
     fromYCoord: '',
     toXCoord: '',
     toYCoord: ''
 * }
 * TaskManager 초기화 시점에 Queue는 null 상태
 * socket_w 에서 
 * socket_n 
 */
exports = module.exports = function (io_web, io_narumi) {
    io_web.on('connection', socket => {
        console.log('client_web connected: ', socket.client.id)

        socket.on('disconnect', () => {
            console.log('client_web disconnected')
        })
    })

    io_narumi.on('connection', socket => {
        console.log('client_narumi connected: ', socket.client.id)

        socket.on('disconnect', () => {
            console.log('client_narumi disconnected')
        })
    })
}