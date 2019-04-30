// ./web-app/src/components/App.js

import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    hi : "hello!"
  }
  render() {
    return (
      <div>
      <h1>{this.state.hi}</h1>
      </div>
    );
  }
}

export default App