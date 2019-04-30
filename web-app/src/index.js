// ./web-app/src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import App from './components/App'

const socket = io('http://localhost:3000')

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept()
export default App