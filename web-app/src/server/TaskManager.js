import Queue from './Queue'

var taskQueue = new Queue()
var position = { xcoord: null, ycoord: null }
var socket_web = null
var socket_narumi = null
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

        socket.on('new_task', (message) => {
            console.log(message)
            taskQueue.enqueue({ xcoord: message.fromXcoord, ycoord: message.fromYcoord, type: 'A' })
            taskQueue.enqueue({ xcoord: message.toXcoord, ycoord: message.toYcoord, type: 'B' })
            console.log(taskQueue)
        })
        socket.on('remove_task', () => {
            taskQueue.dequeue()
            console.log(taskQueue)
        })
        socket.on('disconnect', () => {
            console.log('client_web disconnected')
        })
        // 지속적으로 task와 position socket.emit
        setInterval(() => {
            socket.emit('update_task', taskQueue)
            socket.emit('update_pos', position)
        }, 6000);

    })

    io_narumi.on('connection', socket => {
        console.log('client_narumi connected: ', socket.client.id)
        socket.on('position', (message) => {
            position = { xcoord: message[0], ycoord: message[1] }
        })
        socket.on('disconnect', () => {
            console.log('client_narumi disconnected')
        })
        /* 서버가 명령하면 로봇은 2가지만 한다 : 이동, 정지
         * socket.emit('start_move', [xcoord, ycoord])
         * socket.on('position')
         * postiion A 일 때
         * socket.emit('stop_move')
         * socket.on('ready_to_move')
         * socket.emit('start_move', [xcoord, ycoord])
         * position B 일 때
         * socket.on('position')
         * socket.emit('stop_move')
         * socket.on('ready_to_move')
         * socket.emit('start_move', [xcoord, ycoord])
         */

    })

}