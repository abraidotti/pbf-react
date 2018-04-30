import React, {Component} from 'react';
import { getWeather } from '../utils/forecast';

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {}
    };
  };

  componentDidMount(){
    let forecast = getWeather();
    this.setState({ forecast: forecast })
    console.log(this.state.forecast)
  };

  render(){
    return (
      <div>
      {this.state.forecast ? (
        <p>weather ready to display</p>
      ) : (
        <p>Waiting for weather forecast</p>
      )}
    </div>
    )
  };
};

//     if (!this.props.validLocation){
//       return(
//         <div id="weather-container">
//           <h1>Waiting on location to render weather</h1>
//         </div>
//       )
//     };
//
//     return(
//       <div id="weather-container">
//         <ul>
//           <p>Weather items</p>
//           {this.props.forecast.keys(subjects).map((item, i) =>
//             (
//               <li className="travelcompany-input" key={i}>
//                 <span className="input-label">key: {i} Name: {subjects[item]}</span>
//               </li>
//             )
//         </ul>
// )}
//       </div>
//     )
