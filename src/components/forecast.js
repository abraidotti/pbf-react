import React, {Component} from 'react';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {latLng: props.latLng}
  };

  render(){
    if (!this.props.validLocation){
      return(
        <div id="weather-container" className="panel">
          <p>Waiting on location for weather</p>
        </div>
      )
    };

    return(
      <div id="weather-container">
        <h4>weather here yo</h4>
        <p>props lat lng = {this.props.latLng}.</p>
      </div>
    )
  };
};

export default Forecast;
