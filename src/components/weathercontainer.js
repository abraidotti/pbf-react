import React, {Component} from 'react';

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
  };

  render(){
    console.log(this.props.forecast)
    // smooth out weather conditions and temperature
    let conditions = this.props.forecast.weather[0].description.charAt(0).toUpperCase() + this.props.forecast.weather[0].description.slice(1);
    let temp = Math.round((9/5) * (this.props.forecast.main.temp - 273) + 32);
    let imgString = `http://openweathermap.org/img/w/${this.props.forecast.weather[0].icon}.png`;

    return (
      <div>
        <div id="weather-container">
          <p>{temp}</p>
          <img src={imgString} alt="weather icon" />
        </div>
        {/* '01' ||  */}
        { (this.props.forecast.weather[0].icon.includes('09' || '10' || '11' || '13')) &&
          <div id="weather-message" className="message-warning">
            <p>{conditions} today.</p>
          </div>
        }
      </div>
    )
  };
};
