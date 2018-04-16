import React, {Component} from 'react';

class StationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {latLng: props.latLng}
  };

  render(){
    if (!this.props.validLocation){
      return(
        <div id="stations-list">
          <h1>Waiting on location to render closest stations</h1>
        </div>
      )
    };

    return(
      <div id="stations-list">
        <h1>Stations List</h1>
        <h2>props lat lng = {this.props.latLng}.</h2>
      </div>
    )
  };
};

export default StationsList;
