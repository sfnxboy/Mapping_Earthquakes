#Mapping Earthquakes

**Tools Used**
JavaScript, HTML, CSS

## Overview
One way we can tell stories with data is through interactive maps! Creating interactive maps that are easy to use is a necessary skill for someone in the data visualization field. Maps allow users to explore, understand, and make decisions about our data. In this project we use GeoJSON to create the interactive world map, a type of JSON file specifically designed to host geographical information. GeoJSON data is a type of JavaScript Object Notation (JSON) data that is specifically designed to host geographical information. GeoJSON is utilized across a number of applications, from ride sharing, to navigation, to food delivery services. The GeoJSON format is the industry standard for hosting geographic data and non-spatial attributes. Non-spatial data is data that is independent of all geometric considerations, and packaged in a hierarchical structure in the GeoJSON file. Examples of non-spatial data include elevation, temperature, rain accumulation, hail size, time the data was collected or time the event occurred, and most relevant to our project, magnitude of an earthquake.

There are a number of geographical features that can be expressed through a GeoJSON file, communicated through JavaScript, and finally showcased on any website. Geographical features include points, which contain addresses and locations, such as latitude and longitude coordinates, as well as “linestrings”, which contain coordinates for the boundaries of streets, highways, travel routes, and tectonic plates. Polygons contain coordinates for the boundaries of zip codes, counties, countries, provinces, and tracts of land. 

Using my knowledge of JavaScript, and the D3.js library, I will traverse and retrieve GeoJSON earthquake data and GeoJSON tectonic plate boundary data in order to populate a geographical map. For this, we will also use the Leaflet library and the MapBox API.

## Plotting GeoJSON Data

 
There is a lot going on here, so let’s slow down here.
On line 226, we initialize a variable called torontoData in our JavaScript file, and we assign to it a link to a GeoJSON file that contains the all of the geographic features of Toronto’s neighborhoods. Check out the link for a more in depth view of what to expect in a GeoJSON file!

https://raw.githubusercontent.com/sfnxboy/Mapping_Earthquakes/main/torontoNeighborhoods.json

In the JSON data, we can see that the geometry type is “Polygon” . To form a polygon, the coordinates have to be an array of linear ring (LinearRing) coordinate arrays. A LinearRing is a LineString with at least four or more sets of coordinates, where the starting and end points have the same coordinates.

The d3.json() function is used to fetch the JSON file. GeiJSON objects are added to the map through a GeoJSON layer using the Leaflet.js library. To create a layer and add it to a map, we can use the following code:
```
L.geoJSON(geojsonFeature).addTo(map);
```
The style option can be used to style a feature. In our case, I initialize a myStyle variable earlier in the code shared in the screenshot. The onEachFeature option is a function that gets called on each feature before adding it to the GeoJSON layer. A common reason to use this option is to attach a popup to features when they are clicked. The .bindPopup function takes a parameter, written in HTML format, to customize the popup.

## Earthquake Maps

We support both desktop and mobile application development by using the latest earthquake GeoJSON data from the US Geological survey website. JavaScript and the D3.js libraries are used to retrieve the coordinates and magnitudes of the earthquakes from the GeoJSON data. The Leaflet library provides a convenient way to plot the data on a Mapbox map, which is accessed through an API request and to create an interactive method to explore the earthquake data. On the map, the magnitude and location of the earthquake will be shown in a popup marker. The diameter of the marker of each earthquake reflect the magnitude of the earthquake in both size, and color. Earthquakes with greater magnitudes appear larger, and take on a color that reflect their size relative to the Richter scale. A legend, placed on the bottom right of the screen, provides context for the map data. To illustrate the correlation between seismic activity, and tectonic plates, fault lines are added on the map.

The logic.js file is the file linked to the index.html file. It includes very well commented code. If you are interested in the code written for this application, take a look at the logic.js file. The logic2.js file contains a lot of miscellaneous projects used to plot lines, circles, circle markers, and more using other GeoJSON data.
