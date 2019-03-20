// ./server/src/client/App.js

import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader'


class MyComponent extends Component {
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

export default hot(module)(MyComponent);