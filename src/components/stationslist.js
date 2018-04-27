import React, {Component} from 'react';

export default class StationsList extends Component {
  constructor(props) {
    super(props);
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
        <p>Stations List</p>
        <p>props lat lng = {this.props.latLng}.</p>
      </div>
    )
  };
};
