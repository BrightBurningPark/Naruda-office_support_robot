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
        <Home login={socket.login} />
      )
    } else {
      return (
        <Main session={session} socket={socket} />
      )
    }
  }
}
