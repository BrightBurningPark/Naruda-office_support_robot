import React, {Component} from 'react'
import { Button, Header, Divider } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import map from './map/example2.png'





export default class MapPoint extends Component{
    state = {function : false}
    

    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0};
      }
    
    
      handleMouseMove(event) {
        this.setState({
          x: event.clientX,
          y: event.clientY
        });
      }
    

      render() {
            return (
              <div>
                <img src={map} alt='map' onClick = {this.handleMouseMove}  />
                <Divider />
                <Header as = "h3">{this.state.x},{this.state.y} </Header>
                <Button> Done! </Button>
              </div>
        );
    
    
    }

}