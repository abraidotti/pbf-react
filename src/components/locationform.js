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
      locationData: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({errorMessage: ''});

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.query}&key=${process.env.REACT_APP_GKEY}`)
      .then(response => {
        if (response.ok) {
          console.log('Validating location...');
          return response.json()
        }
      })
      .then(data => {
        if (data.results[0].formatted_address.includes('Philadelphia, PA')){
          console.log("Location valid.");
          this.setState(
            {
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
              validLocation: true,
              isLoading: false,
              locationData: data.results[0].geometry,
            });
          return data;
        } else {
          this.setState({ errorMessage: `Try a location in Philadelphia.`});
          console.log(`formatted address: ${data.results[0].formatted_address}`);
        }
      })
      .catch(error => {
        this.setState({ errorMessage: 'bad address'});
      })
  };

  render() {
    return(
      <div>
        <div className="locationFormContainer" className="panel">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Location Search</legend>
                <label>
                <input
                  name="query"
                  type="text"
                  size="25"
                  placeholder="Input your address."
                  value={this.state.query}
                  onChange={this.handleInputChange} />
                </label>
                <input id="locationButton" type="submit" value="submit" />
                <div id="errorContainer">{this.state.errorMessage}</div>
              </fieldset>
          </form>

              {this.state.validLocation ? (
                <div>
                  <WeatherContainer valid={this.state.validLocation}/>
                  <MapContainer google={this.props.google}/>
                  <StationsContainer stations={this.state.locationData}/>
                </div>
              ) : (
                <div>
                  <p>Waiting for valid location</p>
                </div>
              )}

        </div>
      </div>
    )
  };
};
