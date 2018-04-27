import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';

import Nav from './components/nav';
import LocationForm from './components/locationform';
import Footer from './components/footer';

const env = require('env2')('../.env');

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
          <LocationForm />
        <Footer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GKEY,
})(App)
