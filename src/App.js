import React, { Component } from 'react';
import Nav from './components/Nav';
import LocationForm from './components/LocationForm';
import WeatherContainer from './components/WeatherContainer';
import MapContainer from './components/MapContainer';
import StationsContainer from './components/StationsContainer';
import { getClosestStations } from './utils/haversine';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allStations: {},
      closestStations: {},
      station: {}, gotStation: false,
      forecast: {}, gotForecast: false,
      location: {}, gotLocation: false,
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
    const mapHeight = window.innerHeight/2;
    const mapWidth = window.innerHeight/2;

    return (
      <>
        <Nav />
        <div className="container" style={{ backgroundColor: '#98D735' }}>
          <div className="row">
            <div className="col-sm-4">

              {this.state.gotForecast ?
                <WeatherContainer forecast={this.state.forecast} />
              : <></>
              }

              <LocationForm sendLocation={this.getLocation} />

              {this.state.gotStation ?
                <StationsContainer station={this.state.station} />
              : this.state.gotLocation ?
                 <p>Click on a marker for more information.</p>
                 : <></>
              }
            </div>

              {this.state.gotLocation ?
                <div className="col-sm-8">
                  <div style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}>
                    <MapContainer
                      location={this.state.location}
                      stations={this.state.closestStations}
                      sendStation={this.getStation}
                    />
                  </div>
                </div>
              : <></>
              }
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
