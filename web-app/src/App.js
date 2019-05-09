// ./web-app/src/components/App.js

import React, { Component } from 'react'
import Contents from "./components/Contents"
import Mainpage from "./components/Mainpage"
import './App.css'



class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      subject:{title:'나르다', sub : '제목'},
      welcome:{title:'Welcome', sub : 'this is mainpage'},
      contents:[
        {id:1, title: 'first function', desc : 'first functional action'},
        {id:2, title: 'Second function', desc : "Second functional action"}
      ]
    }
  }


  render() {
    var _title,_sub = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _sub = this.state.welcome.sub;
    }else if(this.state.mode === 'read'){
      
    }
    return (
      <div classNmae="App">
       <Mainpage title = {this.state.subject.title} sub="제목"></Mainpage>
       
       <Contents data={this.state.contents}></Contents>

      </div>
    );
  }
}

export default App