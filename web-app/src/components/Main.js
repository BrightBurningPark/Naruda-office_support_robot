import React, {Component} from 'react'

class Main extends Component{
    render(){
      return (
        <header>
          <h1>{this.props.title}</h1>
          {this.props.sub}
        </header>
      );
    }
  }
  
  export default Main