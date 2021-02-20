import React from 'react';
import L from 'leaflet';

const style = {
  width: '100%',
  height: '100%',
};


export class Map extends React.Component {
  componentDidMount() {
    const { userPosition, circleRadius } = this.props;

    this.map = L.map('map', {
      center: userPosition,
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '',
        }),
      ],
    });

    this.layer = L.layerGroup().addTo(this.map);
    L.circle(userPosition, { radius: circleRadius }).addTo(this.layer);
    L.circle(userPosition, { radius: 3, color: 'red' }).addTo(this.layer);
  }
  componentDidUpdate({ userPosition, circleRadius }) {
    if (this.props.userPosition !== userPosition) {
      this.updateMarkers(this.props.userPosition);
    }
    if (this.props.circleRadius !== circleRadius) {
      this.updateMarkers(this.props.userPosition);
    }
  }

  updateMarkers(marker) {
    const { circleRadius} = this.props;
    this.layer.clearLayers();
    
    L.circle(marker, {radius: 3, color: 'red'}).addTo(this.layer);
    L.circle(marker, { radius: circleRadius }).addTo(
      this.layer
    );
    this.map.flyTo(marker, 16);
  }
  render() {
    return <div id="map" style={style} />;
  }
}
