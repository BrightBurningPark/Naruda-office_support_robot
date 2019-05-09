// ./web-app/src/components/App.js

import React, { Component } from 'react'
import Contents from "./Contents"
import Main from "./Main"
import './App.css'



class App extends Component {
  
  render() {
    return (
      <div classNmae="App">
       <Main title = "나르다" sub="제목"></Main>
       <Contents></Contents>


      </div>
    );
  }
}

export default App