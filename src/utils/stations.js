export function getClosestStations(latLng, stationsObject) {
  
  let userLatLng = new window.google.maps.LatLng(latLng.lat, latLng.lng);
  let result = [];

  console.log("lat lng google object from stations.js", userLatLng)
  console.log("stations object in stations.js", stationsObject)

  console.log("stationsObject.features[0].geometry.coordinates[1] in stations.js", stationsObject.features[0].geometry.coordinates[1])



  console.log("result from stations.js", result)

};
