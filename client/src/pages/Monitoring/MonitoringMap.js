import React from 'react';
import L from 'leaflet';

const style = {
  width: '500px',
  height: '500px',
};


const defaultPosition = [50.472139999999996, 30.5185647];

export class Map extends React.Component {
  componentDidMount() {
    const { devices } = this.props;

    this.map = L.map('map', {
      center: defaultPosition,
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '',
        }),
      ],
    });

    this.layer = L.layerGroup().addTo(this.map);
    this.drawPoints(devices);
  }
  componentDidUpdate({ devices }) {
    if (this.props.userPosition !== devices) {
      this.updateMarkers(this.props.devices);
    }
  }

  drawPoints(devices) {
    devices.forEach((device) => {
      device.coordinates.forEach(marker => {
        L.circle(marker, { radius: 2 }).addTo(this.layer);
      })
    });
  }

  updateMarkers(devices) {
    this.layer.clearLayers();
    this.drawPoints(devices);
    if (devices.length) {
      const center = devices[0].coordinates[0];
      this.map.flyTo(center, 16);
    }
  }
  render() {
    return <div id="map" style={style} />;
  }
}
