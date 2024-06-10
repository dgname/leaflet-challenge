# leaflet-challenge

The provided code is part of a project aimed at visualizing earthquake data and tectonic plate boundaries on an interactive map using Leaflet, a popular JavaScript library for creating interactive maps. The project utilizes various web technologies, including Leaflet for map rendering, D3.js for data manipulation and visualization, and Mapbox for tile layers.

The main features of the project include:

Interactive Map: The script initializes a Leaflet map object with customizable base layers, allowing users to switch between different map styles such as grayscale, outdoors, and satellite.

Earthquake Data Visualization: The script fetches earthquake data from a GeoJSON source and visualizes it on the map. Each earthquake is represented by a circle marker whose size and color reflect its magnitude and depth, respectively. Users can click on each marker to view detailed information about the earthquake.

Tectonic Plate Boundary Visualization: Additionally, the script fetches tectonic plate boundary data from another GeoJSON source and overlays it on the map. These boundaries are styled with an orange color, providing context for understanding seismic activity in relation to tectonic plate movements.

User Controls: The project includes custom controls to toggle between displaying earthquake data and tectonic plate boundaries. Users can also switch between different base map styles to suit their preferences.

Legend: To aid interpretation of the earthquake depth encoding, a legend is provided on the map, indicating the color scheme used to represent different depth ranges.

Overall, the project offers an informative and interactive way to explore earthquake data and understand their geological context in relation to tectonic plate boundaries. It provides users with a visually engaging platform to analyze and interpret seismic activity worldwide.

1. Layers Definition
This section initializes two layer groups:

earthquakeLayer: A layer group to store earthquake data.
platesLayer: A layer group to store tectonic plate boundary data.
2. Custom Control
Defines a custom control named overlays which allows toggling between displaying earthquakes and tectonic plates on the map.

3. Tile Layers
Three tile layers are defined for different map styles:

grayscaleLayer: Mapbox grayscale style.
outdoorsLayer: Mapbox outdoors style.
satelliteLayer: Mapbox satellite style.
4. Map Initialization
Creates a Leaflet map object named myMap centered at latitude 20 and longitude 0, with a default zoom level of 2. The default layer displayed on the map is the satellite map layer.

5. Adding Layers Control
A control is added to the map to toggle between different base layers (map styles) and overlays (earthquake and tectonic plate layers).

6. Earthquake Data
Fetches earthquake data from a GeoJSON source and adds it to the earthquakeLayer on the map. Each earthquake is represented by a circle marker with customizable appearance.

7. Color Encoding for Depth
Determines the color of each earthquake marker based on its depth using the getColor() function. A legend is provided to interpret the depth encoding.

8. Tectonic Plates Data
Fetches tectonic plate boundary data from a GeoJSON source and adds it to the platesLayer on the map. The boundaries are styled with an orange color.

9. Legend
Adds a legend control to the map to explain the color encoding used for earthquake depth.

Each section of the script serves a specific purpose in setting up the map visualization, fetching and displaying relevant data, and providing user controls for interaction and interpretation.