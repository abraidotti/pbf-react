import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const GoogleMapsWrapper = withScriptjs(
  withGoogleMap(props => {

    const { onMapMounted, ...otherProps } = props;

    return (
      <GoogleMap
        {...otherProps}
        ref={c => { onMapMounted && onMapMounted(c) }}
      >
        {props.children}

      </GoogleMap>
    );
  })
);

export default class MapPage extends React.Component {

  _mapRef = null;

  _handleMapMounted = c => {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    console.log("Ref set later @ " + Date.now());
  };

  _handleBoundsChanged = () => {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
    console.log(center, bounds)
  };

  handleClick = (event) => {
    console.log("marker clicked")
  }

  render() {
    return (
      <GoogleMapsWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GKEY
        }&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={14}
        defaultCenter={this.props.location.geometry.location}
        onMapMounted={this._handleMapMounted}
        onBoundsChanged={this._handleBoundsChanged}
      >
      {this.props.stations.map(station => (
        <Marker
          key={station.properties.kioskId}
          position={{ lat: station.properties.latitude,
                      lng: station.properties.longitude }}
        />
      ))}
      </GoogleMapsWrapper>
    );
  }
}
