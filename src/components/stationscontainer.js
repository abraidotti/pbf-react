import React, {Component} from 'react';

export default class StationsContainer extends Component {
  render(){
    return (
      <div className="text-center" style={{
        color: '#6C6C6C',
        backgroundColor: '#E6E6E6',
        borderRadius: '4px',
        marginBottom: '4px'
      }}>
        <p>{this.props.station.name}</p>
        <p>bikes available: {this.props.station.bikesAvailable}</p>
        <p>docks available: {this.props.station.docksAvailable}</p>
      </div>

  )}
};
