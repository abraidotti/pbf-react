import React from 'react';

const style = {
  navbar: {
    color: 'white',
    backgroundColor: '#0086BF'
  }
}

export default class Nav extends React.Component {
  render(){
    return(
      <nav className="navbar navbar-inverse" style={ style.navbar }>
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand h1">Philly Bike Finder</div>
            <p>Find the closest Indego bike stations!</p>
          </div>
        </div>
      </nav>
    )
  }
}
