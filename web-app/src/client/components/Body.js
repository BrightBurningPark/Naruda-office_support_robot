// 맵, 버튼, 태스크

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Button, Container, Segment } from 'semantic-ui-react'
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

const markericon_blue = new L.icon({
  iconUrl: './data/marker-icon.png'
})

const markericon_yellow = new L.icon({
  iconUrl: './data/marker-icon-y.png'
})

const markericon_red = new L.icon({
  iconUrl: './data/marker-icon-r.png'
})

const markericon_green = new L.icon({
  iconUrl: './data/marker-icon-g.png'
})

var narumiMarker = L.marker([-25, -25], {
  icon: markericon_red,
})

var mymarker = L.marker([-25, -25], {
  icon: markericon_yellow,
})


crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
crs.scale = function (zoom) {
  return Math.pow(2, zoom) / mapMinResolution;
};
crs.zoom = function (scale) {
  return Math.log(scale * mapMinResolution) / Math.LN2;
};

var toX = 0;
var toY = 0;

const enblock = (coord) => {
  if (coord <= -540) { return -630; }
  else if (coord <= -360) { return -450; }
  else if (coord <= -180) { return -270; }
  else if (coord <= 0) { return -90; }
  else if (coord <= 180) { return 90; }
  else if (coord <= 360) { return 270; }
  else if (coord <= 540) { return 450; }
  else { return 630; }
}

@observer
export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NarumiX: 0, NarumiY: 0,
      MyX : 0, MyY:0,
      markerPosition: [100, 100]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.narumiXcoord !== this.state.NarumiX && nextProps.narumiXcoord !== null) {
      if (nextProps.narumiYcoord !== this.state.NarumiY && nextProps.narumiYcoord !== null) {
        this.setState({ NarumiX: nextProps.narumiXcoord, NarumiY: nextProps.narumiYcoord });
      }
    }

    if (nextProps.myXcoord !== this.state.MyX && nextProps.myXcoord !== null) {
      if (nextProps.myYcoord !== this.state.MyY && nextProps.myYcoord !== null) {
        this.setState({ MyX: nextProps.myXcoord, MyY: nextProps.myYcoord });
      }
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

    var destMarker = L.marker([0, 0], {
      icon: markericon_blue,
      draggable: true
    }).addTo(this.map);

    narumiMarker.addTo(this.map);
    mymarker.addTo(this.map);

    this.map.on('click', function (e) {
      let x = e.latlng;
      var xcoord = enblock(x.lat)
      var ycoord = enblock(x.lng)
      toX = ycoord
      toY = xcoord + 720
      console.log("x" + xcoord + "bx" + x.lat);
      console.log("y" + ycoord + "by" + x.lng);
      destMarker.setLatLng([xcoord, ycoord]);
    });

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
    this.props.addTask(toX, toY);
  }

  render() {
    const { taskQueue, myXcoord, myYcoord, narumiXcoord, narumiYcoord } = this.props

    narumiMarker.setLatLng([this.state.NarumiX, this.state.NarumiY])
    mymarker.setLatLng([this.state.MyX, this.state.MyY])
    
    return (
      <div>
        <Container textAlign='center'>
          <Wrapper width="1000px" height="720px" id="map" />
        </Container>
        <Button onClick={this.handleSubmit}>Call Narumi</Button>

        {
          taskQueue.map((task) => {
            return (
              <Segment.Group horizontal>
                <Segment>나르미가 다음 이동할 X : {task.xcoord}</Segment>
                <Segment>나르미가 다음 이동할 Y : {task.ycoord}</Segment>
                <Segment>{task.type}</Segment>
              </Segment.Group>
            );
          })
        }

        {/* to be removed */}
        {/* <strong>onChange:</strong>
        <pre>{JSON.stringify({ toX, toY, myXcoord, myYcoord, narumiXcoord, narumiYcoord }, null, 6)}</pre> */}
      </div>
    );
  }
}