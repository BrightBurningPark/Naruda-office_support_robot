import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Session from './core/Session'
import Socket from './core/Socket'

const session = new Session({});
const socket = new Socket({ session });

ReactDOM.render(<App session={session} socket={socket} />,
    document.getElementById('root'));