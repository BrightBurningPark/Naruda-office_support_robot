import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

export default class MapPoint extends Component{

    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
      }
    
      handleMouseMove(event) {
        this.setState({
          x: event.clientX,
          y: event.clientY
        });
      }
    
      render() {
        return (
          <div style={{height: '100%'}} onMouseMove = {this.handleMouseMove}>
            <h1>주변만 인식 그리드 할당</h1>
            <p>({this.state.x}, {this.state.y})</p>
          </div>
        );
    
    
    }
}