import React, { Component } from 'react'
import { observer } from 'mobx-react'
import LoginForm from './LoginForm'

@observer
export default class App extends Component {
  render() {
    const { session, socket } = this.props;

    if (!session.logedIn) {
      return (
        <LoginForm
          login={socket.login}
        />
      )
    } else {
      return(
        <div>
          Login Success!
        </div>
      )

    }
  }
}
