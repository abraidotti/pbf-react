import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const GoogleMapsWrapper = withScriptjs(
  withGoogleMap(props => {
    const { ...otherProps } = props;

    return (
      <GoogleMap
        {...otherProps}
      >
        {props.children}
      </GoogleMap>
    );
  })
);

export default class MapPage extends React.Component {
  handleClick = (event) => {
    console.log('clicked')
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
      >
      {this.props.stations.map(station => (
        <Marker
          key={station.properties.kioskId}
          position={{ lat: station.properties.latitude,
                      lng: station.properties.longitude }}
          onClick={()=>{console.log(station.properties.name)}}
        />
      ))}
      </GoogleMapsWrapper>
    );
  }
}
