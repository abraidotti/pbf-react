import {Map, GoogleApiWrapper} from 'google-maps-react';

export function getClosestStations(latLng, stationsObject) {
  let userLatLng = new window.google.maps.LatLng(latLng[0], latLng[1]);
  let result = [];

  // first try to get all Indego stations within walking distance
  for (let station in stationsObject) {
    let stationLatLng = new window.google.maps.LatLng(
      stationsObject[station].geometry.coordinates[1],
      stationsObject[station].geometry.coordinates[0]
    );

    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(userLatLng, stationLatLng);

    // grab all Indego stations within one kilometer
    if (distance < 1000) {
      result.push(stationsObject[station])
    };
  };

  if (result.length <= 2) {
    // no stations found within 1km, so let's grab the closest by distance
    // map stations to a temporary array with index and sort value
    let mappedStations = stationsObject.map(function(station, index) {
      let stationLatLng = new window.google.maps.LatLng(
        stationsObject[index].geometry.coordinates[1],
        stationsObject[index].geometry.coordinates[0]
      );

      // sort value with Google Maps API's distance calculation
      return { index: index, value: window.google.maps.geometry.spherical.computeDistanceBetween(userLatLng, stationLatLng) };
    });

    // sort mapped array
    let sortedStations = mappedStations
      .sort(function(a, b) {
        if (a.value > b.value) {
          return 1;
        };
        if (a.value < b.value) {
          return -1;
        };
        return 0;
      })
      .map(function(station){
        return stationsObject[station.index];
      });

    // return a number of closest stations
    let closestStationCount = 3;
    // prepare to return this number of stations
    for(let i = 0; i < closestStationCount; i++){
      result[i] = sortedStations[i];
    };

  };

  return result;
};
