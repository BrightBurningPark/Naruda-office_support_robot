import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Home from './Home'
import Main from './Main'

@observer
export default class App extends Component {
  render() {
    const { session, socket } = this.props;

    if (!session.logedIn) {
      return (
        <Home session={session} socket={socket} auth={socket.auth}/>
      )
    } else {
      return (
        <Main session={session} socket={socket} />
      )
    }
  }
}
