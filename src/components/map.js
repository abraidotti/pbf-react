import React, {Component} from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {latLng: props.latLng}
  };

  render(){
    if (!this.props.validLocation){
      return(
        <div id="map">
          <p>Waiting for location to draw map</p>
        </div>
      )
    };

    return(
      <div id="map">
        <h1>Map here yo</h1>
        <h2>props lat lng = {this.props.latLng}.</h2>
      </div>
    )
  };
};

export default Map;
