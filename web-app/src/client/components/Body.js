// 맵, 버튼, 태스크

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

@observer
export default class Body extends Component {

  componentDidMount(){
    this.map = L.map('map',{
      center: [58,16],
      zoom : 6,
      zommControl : false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(this.map);
  }

  render() {
      return(
        <Wrapper width="1000px" height="720px" id="map"/>
      
      );
  }
}