import React, {Component} from 'react';

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    // smooth out weather conditions and temperature
    let conditions = this.props.forecast.weather[0].description.charAt(0).toUpperCase() + this.props.forecast.weather[0].description.slice(1);
    let temp = Math.round((9/5) * (this.props.forecast.main.temp - 273) + 32);
    let imgString = `https://openweathermap.org/img/w/${this.props.forecast.weather[0].icon}.png`;

    return (
      <div>
        <div id="weather-box">
          <img src={imgString} alt="weather icon" />
          <h2>{temp}</h2>
        </div>
        {/* to test, add: '01' ||  */}
        { (this.props.forecast.weather[0].icon.includes('09' || '10' || '11' || '13')) &&
          <div id="warning-container">
            <p>{conditions} today.</p>
          </div>
        }
      </div>
    )
  };
};
