import React, {Component} from 'react';

import Forecast from '../components/forecast';
import MapContainer from '../components/mapcontainer';
import StationsList from '../components/stationslist';

class Console extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    if (!this.props.validLocation){
      return(
        <div id="console">
          <p>Waiting for valid location.</p>
        </div>
      )
    };

    return(
      <div id="console">
        <p>console loaded</p>
        <p>{this.props.locationData[0]}</p>
        <Forecast {...this.props}/>
        <MapContainer google={this.props.google}/>
        <StationsList {...this.props}/>
      </div>
    )
  };
};

export default Console;
