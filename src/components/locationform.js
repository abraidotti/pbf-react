import React, { Component } from 'react';
import Map from '../components/map';
import StationsList from '../components/stationslist';

class LocationForm extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      isLoading: true,
      locationData: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange(event) {
  }

  handleSubmit(event) {
    event.preventDefault();
    const GKEY = 'AIzaSyC87bAzg2HQb3-tE6uUeib_10VMmMdU1kY';
    this.setState({isLoading: true});
    this.setState({locationData: {cheese: 'cheesey'}});
    //
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.query}&key=${GKEY}`)
    // .then(response => {
    //   if (response.ok) {
    //     return response.json()
    //   }
    // })
    // .then(data => {
    //   this.setState({locationData: data})
    //   this.setState({isLoading: false})
    // });

  };

  render() {
    return(
      <div className="locationFormContainer" class="panel">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Location Search</legend>
              <label>
              <input
                name="query"
                type="text"
                size="25"
                placeholder="Input your address."
                value={this.state.query}/>
              </label>
              <input id="locationButton" type="button" value="submit" />
              <div id="errorContainer"></div>
            </fieldset>
        </form>

          <Map data="cheese"/>
          <StationsList data="cheese"/>
      </div>
    )
  };
};

// LocationForm.defaultProps = {
//   query: 'cheese'
// };

export default LocationForm;
