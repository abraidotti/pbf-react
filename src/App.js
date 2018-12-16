import React, { Component } from 'react';
import LocationForm from './components/LocationForm';
import WeatherContainer from './components/WeatherContainer';
import MapContainer from './components/MapContainer';
import StationsContainer from './components/StationsContainer';
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
    let station = this.state.allStations.filter(station => station.properties.kioskId === id)
    this.setState( { station: station[0].properties, gotStation: true })
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
  }

  componentDidMount(){
    fetch('https://www.rideindego.com/stations/json/')
    .then(response => response.json())
    .then(stations => this.setState({ allStations: stations.features }))
    .catch(error => console.error(error))

    fetch(`https://sandro-cors.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,USA&APPID=${process.env.REACT_APP_OWMKEY}`)
    .then(response => response.json())
    .then(forecast => this.setState({ forecast: forecast, gotForecast: true }))
    .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand h1">Philly Bike Finder</div>
            <p>Find the closest Indego bike stations!</p>
          </div>
        </div>
      </nav>

        <LocationForm sendLocation={this.getLocation} />



        {this.state.gotForecast ?
          <WeatherContainer forecast={this.state.forecast} />
        : <p>waiting on weather</p>
        }

        {this.state.gotStation ?

          <StationsContainer station={this.state.station} />
          
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
        <span><a href="https://abraidotti.github.io">{'\u00A9'} Sandro Braidotti</a> | </span>
        <a href="https://github.com/abraidotti/pbf-react" alt="Octicon">
          <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </div>
    );
  }
}

export default App;
