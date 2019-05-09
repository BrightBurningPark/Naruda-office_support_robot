// ./web-app/src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import { hot } from 'react-hot-loader'
import App from './App'

const socket = io('http://localhost:3000');

ReactDOM.render(<App />, document.getElementById('root'))

export default hot(module)(App)