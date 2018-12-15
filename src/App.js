import React, { Component } from 'react';
import './App.css';

import LocationForm from './components/LocationForm';
import WeatherContainer from './components/WeatherContainer';
import MapContainer from './components/MapContainer';
import StationsContainer from './components/StationsContainer';
import Footer from './components/footer';
import { getClosestStations } from './utils/haversine';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allStations: {},
      closestStations: {},
      station: {},
      gotStation: false,
      forecast: {},
      gotForecast: false,
      location: {},
      gotLocation: false
    }
    this.getLocation = this.getLocation.bind(this);
    this.getStation = this.getStation.bind(this);
  }

  getStation(id) {
    console.log(id)
    let station = this.state.allStations.filter(station => station.properties.kioskId === id)
    this.setState( { station: station[0].properties, gotStation: true })
    console.log(this.state.station.name)
  }

  getLocation(locationObject){
    let closestStations =
    this.state.allStations.filter(station =>
      getClosestStations(
        locationObject.geometry.location,
        { lat: station.properties.latitude,
          lng: station.properties.longitude }
        ) < 1)

    this.setState({
      location: locationObject,
      gotLocation: true,
      closestStations: closestStations,
      gotStation: false
    });

    console.log(this.state.closestStations)
  }

  componentDidMount(){
    fetch('https://www.rideindego.com/stations/json/')
    .then(response => response.json())
    .then(stations => this.setState({ allStations: stations.features }))
    .catch(error => console.error(error))
    .finally( gotStations => console.log("all Indego stations from app.js: ", this.state.allStations) )

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
      {this.state.gotStation ?
        <div>
        <StationsContainer station={this.state.station} />
        </div>
      : <p>waiting on station</p>
      }
        {this.state.gotLocation ?
          <div style={{height: '60vh', width: '100vw'}} >
          <MapContainer
            location={this.state.location}
            stations={this.state.closestStations}
            sendStation={this.getStation}
          />
          </div>
        : <p>waiting on location</p>
        }


        <Footer />
      </div>
    );
  }
}

export default App;
