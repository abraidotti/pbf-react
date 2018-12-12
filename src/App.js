import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';

import LocationForm from './components/LocationForm';
import WeatherContainer from './components/WeatherContainer';
import Footer from './components/footer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stations: {},
      forecast: {},
      gotForecast: false,
      location: {},
      gotLocation: false
    }
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(locationObject){
    this.setState({
      location: locationObject,
      gotLocation: true
    });
  }

  componentDidMount(){
    fetch('https://www.rideindego.com/stations/json/')
    .then(response => response.json())
    .then(stations => this.setState({ stations: stations }))
    .catch(error => console.error(error))
    .finally( gotStations => console.log("all Indego stations: ", this.state.stations) )

    fetch(`https://sandro-cors.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,USA&APPID=${process.env.REACT_APP_OWMKEY}`)
    .then(response => response.json())
    .then(forecast => this.setState({ forecast: forecast, gotForecast: true }))
    .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
      <nav>
        <div>
          <h1>Philly Bike Finder</h1>
          <p>Find the closest Indego bike stations!</p>
        </div>
        <LocationForm sendLocation={this.getLocation} />
        {this.state.gotForecast ? <WeatherContainer forecast={this.state.forecast} /> : <p>waiting on weather</p>}
      </nav>

        {this.state.gotLocation ? <p>{this.state.location.formatted_address}</p> : <p>waiting on location</p>}

        <Footer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GKEY,
})(App)
