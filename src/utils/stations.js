export function getClosestStations(latLng, stationsObject) {
  let userLatLng = new window.google.maps.LatLng(latLng.lat, latLng.lng);
  let result = [];

  console.log("lat lng google object from stations.js", userLatLng)
  console.log("stations object in stations.js", stationsObject)

  console.log("stationsObject.features[0].geometry.coordinates[1] in stations.js", stationsObject.features[0].geometry.coordinates[1])

  // first try to get all Indego stations within walking distance
  for (let station in stationsObject.features) {
    let stationLatLng = new window.google.maps.LatLng(
      stationsObject.features[station].geometry.coordinates[1],
      stationsObject.features[station].geometry.coordinates[0]
    );

    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(userLatLng, stationLatLng);

    // grab all Indego stations within one kilometer
    if (distance < 1000) {
      result.push(stationsObject.features[station])
    };
  };

  if (result.length <= 2) {
    // no stations found within 1km, so let's grab the closest by distance
    // map stations to a temporary array with index and sort value
    let mappedStations = stationsObject.features.map(function(station, index) {
      let stationLatLng = new window.google.maps.LatLng(
        stationsObject.features[index].geometry.coordinates[1],
        stationsObject.features[index].geometry.coordinates[0]
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
        return stationsObject.features[station.index];
      });

    // return a number of closest stations
    let closestStationCount = 3;
    // prepare to return this number of stations
    for(let i = 0; i < closestStationCount; i++){
      result[i] = sortedStations[i];
    };

  };

  console.log("result from stations.js", result)

};
