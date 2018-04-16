import React, { Component } from 'react';
import Nav from './components/nav';
import LocationForm from './components/locationform';
import Footer from './components/footer';
import './App.css';

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

export default App;
