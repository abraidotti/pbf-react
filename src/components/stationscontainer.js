import React, {Component} from 'react';

export default class StationsContainer extends Component {
  componentDidMount() {
    console.log(this.props.station.name)
  }

  render(){
    return (
      <div>
        <p>{this.props.station.name}</p>
      </div>

  )}
};
