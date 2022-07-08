let map = L.map("map",{
  attributionControl: false,//Removed leaflet and openstreetmap banner
}).setView([48.814, 28.235], 4);

// add the OpenStreetMap tiles
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution: "", 
}).addTo(map);

// add satellite tiles
var BING_KEY =
  "AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L";
var bing = L.tileLayer.bing(BING_KEY);

var listOfCountriesOrange = ["Ukraine"];
var listOfCountriesGreen = [
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

var geojsonLayerCountries = L.geoJson.ajax("data/countries.geo.json", {
  middleware: function (data) {
    // select countries from the list
    return data.features.filter((f) =>
      listOfCountriesGreen.includes(f.properties.name)||listOfCountriesOrange.includes(f.properties.name)
    );
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
    // color rule for the countries
    if (listOfCountriesOrange.includes(feature.properties.name)) {
      layer.setStyle({
        fillColor: "orange",
        weight: 1,
        opacity: 1,
        color: "#ff0000",
        fillOpacity: 0.7,
      });
    } else if (listOfCountriesGreen.includes(feature.properties.name)) {
      layer.setStyle({
        fillColor: "lightgreen",
        weight: 1,
        opacity: 1,
        color: "#ff0000",
        fillOpacity: 0.7,
      });
    }
  },
});

// geojsonLayerCountries.refilter(function(feature){
//     return feature.properties.name === 'Ukraine';
// });
geojsonLayerCountries.on("data:loaded", function (e) {
  geojsonLayerCountries.addTo(map);
  map.fitBounds(geojsonLayerCountries.getBounds()); //zoom the map to show all the selected countries
});

var geojsonLayerPoints = L.geoJson.ajax("data/points.geojson");
geojsonLayerPoints.addTo(map);

var layerSwitcher = L.control
  .layers(
    // baselayers
    {
      OpenStreetMap: osm,
      Bing: bing,
    },
    // overlays
    {
      Countries: geojsonLayerCountries,
      Points: geojsonLayerPoints,
    }
  )
  .addTo(map);
