import React, { Component } from 'react';
import WeatherContainer from '../components/weathercontainer';
import MapContainer from '../components/mapcontainer';
import StationsContainer from '../components/stationscontainer';

export default class LocationForm extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      errorMessage: '',
      isLoading: false,
      validLocation: false,
      lat: '',
      lng: '',
      locationData: {},
      stations: [],
      forecast: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount(){
    let forecast = fetch(`https://sandro-cors.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,USA&APPID=${process.env.REACT_APP_OWMKEY}`)
    .then(response => response.json())

    let stations = fetch('https://www.rideindego.com/stations/json/')
    .then(response => response.json())

    Promise.all([forecast, stations])
    .then( (values) => {
      this.setState({
        forecast: values[0],
        stations: values[1].features
      });
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.setState({ errorMessage: '' });

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.query}&key=${process.env.REACT_APP_GKEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.results[0].formatted_address === 'Philadelphia, PA, USA'){
        this.setState({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            validLocation: true,
            errorMessage: '',
            isLoading: false,
            locationData: data.results[0].geometry,
        });
      } else {
        this.setState({ errorMessage: `Try a location in Philadelphia.`});
      }
    })

  }

  render() {
    return(
      <div>
        <div className="locationFormContainer panel">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Location Search</legend>
                <label>
                <input
                  name="query"
                  type="text"
                  size="25"
                  placeholder="Please input your address."
                  value={this.state.query}
                  onChange={this.handleInputChange} />
                </label>
                <input id="locationButton" type="submit" value="submit" />
                <div id="errorContainer">{this.state.errorMessage}</div>
              </fieldset>
          </form>

              {this.state.validLocation ? (
                  <div>
                    <WeatherContainer forecast={this.state.forecast}/>


                  </div>
              ) : (
                <div></div>
              )}

        </div>
      </div>
    )
  };
};
