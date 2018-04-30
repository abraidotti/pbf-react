export async function getWeather() {
  try {
    return    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Philadelphia,USA&APPID=${process.env.REACT_APP_OWMKEY}`)
      .then(response => response.json())
      .then(weatherObject => console.log(weatherObject))
      .then(weatherObject => { return weatherObject })
  } catch(error) {
      console.log(error);
      throw error;      // let caller know the promise rejected with this reason
    }
}
