import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Forecast from '../components/forecast';
import Map from '../components/map';
import StationsList from '../components/stationslist';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latLng: props.latLng,
      validLocation: props.validLocation
      // set markers
    }
  };

  // here's where we'll find the weather, closest stations, and map info

  render(){
    let props = {
      latLng: `${this.state.lat},${this.state.lng}`,
      validLocation: this.state.validLocation
    };

    if (!this.props.validLocation){
      return(
        <div id="map">
          <p>Waiting for valid location.</p>
          <p>{props}</p>
        </div>
      )
    };

    return(
      <div id="console">
        <Forecast {...props}/>
        <Map {...props}/>
        <StationsList {...props} google={this.props.google}/>
      </div>
    )
  };
};

export default Map;
