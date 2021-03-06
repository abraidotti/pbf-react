import React, { Component } from "react";

export default class WeatherContainer extends Component {
  render() {
    let conditions =
      this.props.forecast.weather[0].description.charAt(0).toUpperCase() +
      this.props.forecast.weather[0].description.slice(1);
    let temp = Math.round((9 / 5) * (this.props.forecast.main.temp - 273) + 32);
    let imgString = `https://openweathermap.org/img/w/${
      this.props.forecast.weather[0].icon
    }.png`;

    let advisory = (this.props.forecast.rain || this.props.forecast.snow) ?
                    <p style={{ color: "#A01E26" }}>Not ideal biking weather.</p> :
                    <></>

    return (
      <div className="text-center">
        <span>{conditions} and {temp}° today.</span>
        <img src={imgString} alt="weather icon" />
        {advisory}
      </div>
    );
  }
}
