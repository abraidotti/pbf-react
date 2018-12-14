import React, { Component } from 'react';
import './App.css';

import LocationForm from './components/LocationForm';
import WeatherContainer from './components/WeatherContainer';
import MapContainer from './components/MapContainer';
import Footer from './components/footer';
import { getClosestStations } from './utils/stations';

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
    // geolocation comes through as an object but station locations come in reversed arrays
    let closestStations = this.state.stations.filter(station =>
      getClosestStations(
        locationObject.geometry.location,
        { lat: station.geometry.coordinates[1],
          lng: station.geometry.coordinates[0] }
        ) < 1)

    this.setState({
      location: locationObject,
      gotLocation: true,
      stations: closestStations
    });

    console.log(this.state.stations)

  }

  componentDidMount(){
    fetch('https://www.rideindego.com/stations/json/')
    .then(response => response.json())
    .then(stations => this.setState({ stations: stations.features }))
    .catch(error => console.error(error))
    .finally( gotStations => console.log("all Indego stations from app.js: ", this.state.stations) )

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
        {this.state.gotForecast ?
          <WeatherContainer forecast={this.state.forecast} />
        : <p>waiting on weather</p>
        }
      </nav>
        {this.state.gotLocation ?
          <div style={{height: '100vh', width: '100vw'}} >
          <MapContainer location={this.state.location} stations={this.state.stations}/>
          </div>
        : <p>waiting on location</p>
        }

        <Footer />
      </div>
    );
  }
}

export default App;
