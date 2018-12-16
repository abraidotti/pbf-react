import React, {Component} from 'react';

export default class StationsContainer extends Component {
  render(){
    return (
      <div>
        <p>{this.props.station.name}</p>
      </div>

  )}
};
