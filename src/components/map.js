import React, {Component} from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latLng: props.data,
    }
  };

  render() {
    return (
      <div id="map">
        <h1>Map here yo</h1>
        <h2>state lat lng = {this.state.latLng}.</h2>
        <h2>props lat lng = {this.props.data}.</h2>
      </div>
    );
  };

};

export default Map;
