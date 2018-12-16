import React, { Component } from 'react';

export default class LocationForm extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      errorMessage: '',
      validLocation: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: '' })

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.query}&key=${process.env.REACT_APP_GKEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.results[0] == null || !data.results[0].formatted_address.includes('Philadelphia, PA')) {
        this.setState({ errorMessage: 'Try a location in Philadelphia.' });
      } else {
        this.props.sendLocation(data.results[0])
        this.setState({ validLocation: true, errorMessage: '' });
      }
    })
    .catch(error => console.error(error))
  }

  render() {
    return(
      <div>
        <div>
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
                <input type="submit" value="submit" />
                <div>{this.state.errorMessage}</div>
              </fieldset>
          </form>
        </div>
      </div>
    )
  };
};
