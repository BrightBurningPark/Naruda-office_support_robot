import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Header from './Header'
import Body from './Body'

@observer
export default class Main extends Component {

    render() {
        const { session, socket } = this.props;

        return (
            <div>
                <Header session={session} socket={socket} />
                <Body
                    socket={socket}
                    taskQueue = {session.taskQueue}
                    myXcoord={session.myXcoord} myYcoord={session.myYcoord}
                    narumiXcoord={session.narumiXcoord} narumiYcoord={session.narumiYcoord}
                    addTask={(xcoord, ycoord) => socket.addTask(xcoord, ycoord)}
                    updatePos={socket.updatePos} updateTask={socket.updateTask}
                />
            </div>
        );
    }
}