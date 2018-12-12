import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getClosestStations } from '../utils/stations';
import {GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationMarkers: []
    }
  };

  componentDidMount() {
    let closestStations = getClosestStations(this.props.location, this.props.stations);

    Promise.all([closestStations])
    .then( (values) => {
      this.setState({
        stationMarkers: values[0],
      })
      console.log(this.state.stationMarkers);
      this.loadMap();
    })
  }

  loadMap() {
    // this function is boilerplate from the google-maps-react docs
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props
      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: this.props.location[0], lng: this.props.location[1]}, // sets center of google map to NYC.
        zoom: 11, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      this.state.stationMarkers.forEach( (station, index) => {
        console.log(station.geometry.coordinates[0]);
        const marker = new google.maps.Marker({
          position: {
            lat: station.geometry.coordinates[1],
            lng: station.geometry.coordinates[0]
          },
          map: this.map,
          title: station.properties.name
        });
        marker.addListener("click", () => {
          // toggle "active" class for styling
          let active = document.querySelector('.active');
          if (active) {
            active.classList.remove('active');
          };
          document.querySelector(`#btn-${index}`).classList.toggle('active');
        });
      })
    }
  }

  render() {
    const style = {
      width: '60vw',
      height: '80vh',
      float: 'left'
    }

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (`${process.env.REACT_APP_GKEY}`)
})(MapContainer)
