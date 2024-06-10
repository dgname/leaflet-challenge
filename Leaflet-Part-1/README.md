# leaflet-challenge

Map Initialization and Data Visualization
This code initializes an interactive map using Leaflet.js and visualizes earthquake data fetched from an external source.

1. Creating the Map Object
The script initializes a Leaflet map object (myMap) with the following configuration:

Centered at latitude 20 and longitude 0.
Zoom level set to 2.
2. Adding Satellite Tile Layer
A satellite tile layer is added to the map using Mapbox's API. The layer provides high-resolution satellite imagery and enhances the visual representation of the map.

3. Fetching and Visualizing Earthquake Data
Using D3.js, the script fetches earthquake data from a GeoJSON source. This data is then visualized on the map using Leaflet's L.geoJson() method. Each earthquake is represented by a circle marker, the size of which corresponds to its magnitude, and a pop-up displaying information such as location, magnitude, depth, and time.

4. Color Encoding for Depth
The color of each earthquake marker is determined based on its depth, with different depth ranges represented by distinct colors. A legend is provided on the map to help interpret the depth encoding.