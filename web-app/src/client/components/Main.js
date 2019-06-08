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
                <Body socket={socket}  addTask={(xcoord, ycoord) => socket.addTask(xcoord, ycoord)}/>
            </div>
        );
    }
}