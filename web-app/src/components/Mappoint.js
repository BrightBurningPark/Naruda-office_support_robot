import React, { Component } from 'react'
import 'semantic-ui-less/semantic.less'
import map from './map/example.png'

export default class MapPoint extends Component {
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
      <div ClassName='map' style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <img src={map} alt='map' />
        <p>({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}