import React, {Component} from 'react';
import { getClosestStations } from '../utils/stations';

export default class StationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closestStations: {}
    }
  };

  componentDidMount(){
    let closestStations = getClosestStations(this.props.location, this.props.stations);

    Promise.all([closestStations])
    .then( (values) => {
      this.setState({
        closestStations: values[0],
      });
      console.log(this.state.closestStations);
    })
  }

  render(){
    return this.state.closestStations.length ?
      <span>stations here</span> : (
      <span>Loading wells...</span>
    )
  }
};
