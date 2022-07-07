let map = L.map("map").setView([48.814, 28.235], 4);

// add the OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

var select = [
  "Albania",
  "Austria",
  "Belgium",
  "Bulgaria",
  "Bosnia and Herzegovina",
  "Switzerland",
  "Germany",
  "Denmark",
  "Finland",
  "United Kingdom",
  "Greece",
  "Croatia",
  "Italy",
  "Luxembourg",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Serbia",
  "Slovakia",
  "Sweden",
  "Tunisia",
  "Turkey",
  "United States",
  "France",
  "Spain",
  "Singapore",
];

var geojsonLayerCountries = L.geoJson.ajax("data/select_countries.geo.json");

geojsonLayerCountries.refilter(function(feature){
    return feature.properties.name === 'Ukraine';
});
geojsonLayerCountries.addTo(map);

var geojsonLayerPoints = L.geoJson.ajax("data/points.geojson");
geojsonLayerPoints.addTo(map);