import React, {Component} from 'react';

export default class StationsContainer extends Component {
  render(){
    return (
      <div className="text-center">
        <p>{this.props.station.name}</p>
        <p>available bikes: {this.props.station.bikesAvailable}</p>
        <p>available docks: {this.props.station.docksAvailable}</p>
      </div>

  )}
};
