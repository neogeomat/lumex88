let map = L.map("map", {
  attributionControl: false, //Removed leaflet and openstreetmap banner
}).setView([48.814, 28.235], 4);

// add the OpenStreetMap tiles
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 21,
  attribution: "",
}).addTo(map);

// add satellite tiles
// https://api.maptiler.com/tiles/satellite-v2/3/6/3.jpg?key=l21BHN6UMYoKzYKqxkKm
let mapTiler = L.tileLayer(
  "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=l21BHN6UMYoKzYKqxkKm",
  {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution:
      '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
    crossOrigin: true,
  }
).addTo(map);

// add countries layer
let listOfCountriesOrange = ["Ukraine"];
let listOfCountriesGreen = [
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

let geojsonLayerCountries = L.geoJson.ajax("data/countries.geo.json", {
  middleware: function (data) {
    // select countries from the list
    return data.features.filter(
      (f) =>
        listOfCountriesGreen.includes(f.properties.name) ||
        listOfCountriesOrange.includes(f.properties.name)
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
let autolinker = new Autolinker({
  truncate: { length: 30, location: "smart" },
});
let geojsonLayerPoints = L.geoJson.ajax("data/map2.geojson", {
  onEachFeature: pop_map2_0,
});
geojsonLayerPoints.addTo(map);

let layerSwitcher = L.control
  .layers(
    // baselayers
    {
      OpenStreetMap: osm,
      MapTiler: mapTiler,
    },
    // overlays
    {
      Countries: geojsonLayerCountries,
      Points: geojsonLayerPoints,
    }
  )
  .addTo(map);

function pop_map2_0(feature, layer) {
  // debugger;
  let popupContent = document.createElement("table");

  popupContent.className = "table table-striped table-bordered results";
  for (row in feature.properties) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = row;
    let td2 = document.createElement("td");
    td2.innerHTML = "<b>" + feature.properties[row] + "</b>";
    tr.appendChild(td1);
    tr.appendChild(td2);
    popupContent.appendChild(tr);
  }
  layer.bindPopup(popupContent, { maxHeight: 400 });

  layer.on("click", function (e) {
    let altTable = document.getElementById("results");
    altTable.innerHTML = "";
    let altTableContent = document.createElement("table");

    altTableContent.className = "table table-striped table-bordered results";
    for (row in e.target.feature.properties) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML = row;
      let td2 = document.createElement("td");
      td2.innerHTML = "<b>" + e.target.feature.properties[row] + "</b>";
      tr.appendChild(td1);
      tr.appendChild(td2);
      altTableContent.appendChild(tr);
    }
    altTable.appendChild(altTableContent);
  });
}
