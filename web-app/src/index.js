// ./web-app/src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './client/Root'
import io from 'socket.io-client'
// const socket = io('http://localhost:3000')

ReactDOM.render(<Root />, document.getElementById('root'));