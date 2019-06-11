import Queue from './Queue'

var taskQueue = new Queue()
var position = { xcoord: 200, ycoord: -300 }

/*
 * taskQueue의 object는 {
     xcoord: '',
     yoord: '',
     type: 'A or B'
 * }
 * TaskManager 초기화 시점에 Queue는 null 상태
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

        // index로 선택적 dequeue
        // socket.on('remove_task', () => {
        //     taskQueue.dequeue()
        //     console.log(taskQueue)
        // })

        socket.on('disconnect', () => {
            console.log('client_web disconnected')
        })

        // 지속적으로 task와 position socket.emit
        setInterval(() => {
            // console.log('frequent socket events emitting')
            socket.emit('update_task', taskQueue)
            socket.emit('update_pos', position)
        }, 1000);
    })

    /*
     * 로봇이 다음 이동 준비가 됬을 때 emit ready_to_move
     * 서버는 on ready_to_move, emit next_task, {x, y, A}
     * 로봇이 목적지에 도착하고 A or B에 해당하는 업무를 자체적으로 완료
     * - 반복 -
     */
    io_narumi.on('connection', socket => {
        console.log('client_narumi connected: ', socket.client.id)

        socket.on('position', (message) => {
            // message는 배열[x, y]
            position = { xcoord: message[1] - 720, ycoord: message[0] }
            console.log(position)
        })

        socket.on('ready_to_move', () => {
            comingTask = taskQueue.dequeue()
            if (comingTask != undefined) {
                message = [comingTask.xcoord, comingTask.ycoord, comingTask.type]
                socket.emit('start_move', message)
            }
        })

        socket.on('disconnect', () => {
            console.log('client_narumi disconnected')
        })
    })
}