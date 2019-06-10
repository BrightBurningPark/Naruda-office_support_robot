// 맵, 버튼, 태스크

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, Container } from 'semantic-ui-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import 'semantic-ui-less/semantic.less'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

const mapExtent = [0.00000000, -716.00000000, 717.00000000, 0.00000000];
const mapMinZoom = 0;
const mapMaxZoom = 2;
const mapMaxResolution = 1.00000000;
const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
const tileExtent = [0.00000000, -716.00000000, 717.00000000, 0.00000000];
const crs = L.CRS.Simple;
crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
crs.scale = function (zoom) {
  return Math.pow(2, zoom) / mapMinResolution;
};
crs.zoom = function (scale) {
  return Math.log(scale * mapMinResolution) / Math.LN2;
};

@observer
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xcoord: '', ycoord: '',
      markerPosition: [100, 100]
    }
  }

  componentDidMount() {

    this.map = L.map('map', {
      maxZoom: mapMaxZoom,
      minZoom: mapMinZoom,
      crs: crs
    });

    L.tileLayer('data/{z}/{x}/{y}.png', {
      minZoom: mapMinZoom, maxZoom: mapMaxZoom,
      attribution: 'Rendered with <a href="https://www.maptiler.com/desktop/">MapTiler Desktop</a>',
      noWrap: true,
      tms: false
    }).addTo(this.map);

    const markericon = new L.icon({
      iconUrl: './data/marker-icon.png'
    })

    L.marker([1, 1], {
      icon: markericon,
      draggable: true
    }).addTo(this.map);

    this.map.fitBounds([
      crs.unproject(L.point(mapExtent[2], mapExtent[3])),
      crs.unproject(L.point(mapExtent[0], mapExtent[1]))
    ]);

    this.props.updatePos()

    this.props.updateTask()
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: parseInt(value, 10) })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.xcoord, this.state.ycoord);
  }

  render() {
    const { xcoord, ycoord } = this.state
    const { taskQueue, myXcoord, myYcoord, narumiXcoord, narumiYcoord } = this.props

    return (
      <div>
        <Container textAlign='center'>
          <Wrapper width="1000px" height="720px" id="map" />
        </Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input fluid label='X Coordinate'  placeholder='X Coordinate' name='xcoord' value={xcoord} onChange={this.handleChange} />
            <Form.Input fluid label='Y Coordinate'  placeholder='Y Coordinate' name='ycoord' value={ycoord} onChange={this.handleChange} />
            <Form.Button type='submit'>Call Narumi</Form.Button>
          </Form.Group>
        </Form>
        {/* to be removed */}
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ xcoord, ycoord, myXcoord, myYcoord, narumiXcoord, narumiYcoord }, null, 6)}</pre>
        <pre>{JSON.stringify({ taskQueue }, null, 1)}</pre>
      </div>
    );
  }
}