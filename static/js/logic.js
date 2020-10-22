// Add console.log to check to see if our code is working
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30,30], 2);
// setView method sets the coordinates and the level of zoom


/* This does the same thing as the line above
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  }); */

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};
// Then we add our 'streets' tile layer to the map.

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})
streets.addTo(map);

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


/* To change the map's style, change the map id using the list of Mapbox ids below:

mapbox.streets
mapbox.light
mapbox.dark
mapbox.satellite
mapbox.streets-satellite
mapbox.wheatpaste
mapbox.streets-basic
mapbox.comic
mapbox.outdoors
mapbox.run-bike-hike
mapbox.pirates
mapbox.emerald
mapbox.high-contrast */


// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  console.log(city)
  //L.marker(city.location)
  L.circleMarker(city.location, {
    radius: city.population/200000,
    color: "white",
    fillColor: "blue",
    weight: 4
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
.addTo(map);
});

/*
// Add a circle to the map
L.circle([34.0522, -118.2437], {
  radius: 100000, // meter radius
  fillColor: "yellow",
  color: "black"
  
}).addTo(map);

L.circleMarker([40.7142, -74.0059], {
  radius: 100,
  color: "white",
  fillColor: "blue"

}).addTo(map); */

// Coordinates for each point to be used in the line.
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "red"
}).addTo(map);


/* A GeoJSON geometry object is where the type member's value is one of 
the following strings: Point, MultiPoint, LineString, MultiLineString, 
Polygon, MultiPolygon, or GeometryCollection. */

/* Point has a single set of coordinates, like when we mapped a single marker to the map.

"geometry":{
  "type":"Point",
  "coordinates": [-118.4, 33.9]
  }

MultiPoint is an array of point coordinates, like when we mapped multiple cities with their population to a map.

"geometry":{
  "type":"MultiPoint",
  "coordinates": [-118.4, 33.9], [-118.5, 34.0]
  }

LineString has an array of Point coordinates, like when we mapped the airline route from LAX to SFO.

"geometry":{
  "type":"LineString",
  "coordinates": [[-118.4, 33.9],[-122.4, 37.6]]
  }

MultiLineString are an array of LineString coordinates, like when we mapped the LAX-SFO-SLC-SEA airline route.

"geometry":{
  "type":"MultiLineString",
  "coordinates":
     [[-118.4, 33.9],[-106.4, 31.8]],
     [[-118.4, 33.9],[-123.2, 44.1]]
  }

Polygon has an array of LineString coordinates. We'll map polygons later in this module.

"geometry": {
   "type": "Polygon",
    "coordinates":
   [
    [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ]
   ]}


MultiPolygon has an array of polygon coordinates. We'll map multiple polygons later in this module.

"geometry": {
   "type": "MultiPolygon",
   "coordinates": [
    [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ],
    [ [ -122.378, 37.826 ], [ -122.377, 37.830 ], [ -122.369, 37.832 ] ]
]} */

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}} //coordinates must be in reverse order as per the GeoJSON stander, ie. long, lat
]};

// Create the map object with center at the San Francisco airport.

//L.geoJSON(geojsonFeature).addTo(map);

// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
  // We turn each feature into a marker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" +  feature.properties.city + ", " + feature.properties.country +  "</h3>");
  }

}).addTo(map);


// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/sfnxboy/Mapping_Earthquakes/main/majorAirports.json"

// Grabbing our GeoJSON data.
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng)
    .bindPopup("<h2>" + feature.properties.faa + "</h2> <hr> <h3>" +  feature.properties.name + "</h3>");
  }
}).addTo(map);
});
