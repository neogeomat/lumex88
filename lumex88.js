let map = L.map("map").setView([48.814, 28.235], 4);

// add the OpenStreetMap tiles
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution:'',
}).addTo(map);

// add satellite tiles
var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
var bing = L.tileLayer.bing(BING_KEY);

var listOfCountries = [
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
  "Republic of Serbia",
  "Slovakia",
  "Sweden",
  "Tunisia",
  "Turkey",
  "United States of America",
  "France",
  "Spain",
  "Singapore",
];

var geojsonLayerCountries = L.geoJson.ajax("data/select_countries.geo.json",{
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
    if(feature.properties.name == "Ukraine"){
      layer.setStyle({
        fillColor: "orange",
        weight: 1,
        opacity: 1,
        color: "#ff0000",
        fillOpacity: 0.7
      });
    }else if(listOfCountries.includes(feature.properties.name)){
      layer.setStyle({
        fillColor: "green",
        weight: 1,
        opacity: 1,
        color: "#ff0000",
        fillOpacity: 0.7
      });
    }
  }
});

// geojsonLayerCountries.refilter(function(feature){
//     return feature.properties.name === 'Ukraine';
// });
geojsonLayerCountries.on('data:loaded', function(e) {
geojsonLayerCountries.addTo(map);
map.fitBounds(geojsonLayerCountries.getBounds());
});

var geojsonLayerPoints = L.geoJson.ajax("data/points.geojson");
geojsonLayerPoints.addTo(map);

var layerSwitcher = L.control.layers({
  "OpenStreetMap": osm,
  "Bing": bing,
}, {
  "Countries": geojsonLayerCountries,
  "Points": geojsonLayerPoints,
}).addTo(map);