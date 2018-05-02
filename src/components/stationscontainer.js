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
      })
      console.log(this.state.closestStations);
    })
  }

  render(){
    return this.state.closestStations.length ? (
        <div>
        {
          this.state.closestStations.map( (station, index) =>
            <div id="stations-list" key={index} className="panel">
              <h4>{station.properties.name}</h4>
              <p>{station.properties.addressStreet}</p>
              <p><span>bikes available: {station.properties.bikesAvailable} | </span>
              <span>open docks: {station.properties.docksAvailable}</span></p>
            </div>
          )
        }
        <p>stations are ready</p>
      </div>
    ) : (
      <div>
        <p>Loading stations...</p>
      </div>
    )
  }
};
