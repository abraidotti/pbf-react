import React, {Component} from 'react';

export default class StationsContainer extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    console.log(this.props.stations)
    return(
      <p>stations go here</p>
    )
  //   if (!this.props.validLocation){
  //     return(
  //       <div id="stations-list">
  //         <h1>Waiting on location to render closest stations</h1>
  //       </div>
  //     )
  //   };
  //
  //   return(
  //     <div id="stations-list">
  //       <p>Closest Stations</p>
  //
  //       <p>props lat lng = {this.props.latLng}.</p>
  //     </div>
  //   )
  };
};
