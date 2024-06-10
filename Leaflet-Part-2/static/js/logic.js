// Define layers
let earthquakeLayer = L.layerGroup(); // Create a layer group for earthquakes
let platesLayer = L.layerGroup(); // Create a layer group for tectonic plates

// Custom control for earthquakes and tectonic plates
let overlays = {
    "Earthquakes": earthquakeLayer, // Add earthquake layer
    "Tectonic Plates": platesLayer // Add tectonic plates layer
};

// Define tile layers
let grayscaleLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/light-v10', // Grayscale style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

let outdoorsLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/outdoors-v11', // Outdoors style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

let satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/satellite-v9', // Satellite style
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGduYW1lIiwiYSI6ImNseDk3djltdDJvZWYybHBvZm8ycDNjYmgifQ.MVi4dHGFLb5Du360HqicFA' 
});

// Adding layers control
let baseLayers = {
    "Grayscale Map": grayscaleLayer,
    "Outdoors Map": outdoorsLayer,
    "Satellite Map": satelliteLayer
};

// Creating the map object
let myMap = L.map("map", {
    center: [20, 0],
    zoom: 2,
    layers: [satelliteLayer] // Setting grayscale layer as default
});

L.control.layers(baseLayers,overlays).addTo(myMap);


// URL to fetch the GeoJSON data for earthquakes
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetching our GeoJSON data
d3.json(link).then(function(data) {
    L.geoJson(data, {
        // Turn each point into a circle marker using Leaflet's circleMarker() method.
        // pointToLayer allows you to define how each point feature should be represented on the map.
            pointToLayer: function(feature, latlng) {
                // Extract latitude and longitude
                const latitude = latlng.lat;
                const longitude = latlng.lng;
                // Customize marker appearance
                return L.circleMarker([latitude, longitude], {
                    radius: getRadius(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]), // Calling getColor function, defined below
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            // Function to attach popups to each marker
            // onEachFeature binds a popup to each marker displaying information such as location, magnitude, depth, and time, shown when clicked.
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`
                    <strong>Location:</strong> ${feature.properties.place}<br>
                    <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                    <strong>Depth:</strong> ${feature.geometry.coordinates[2]}<br>
                    <strong>Time:</strong> ${new Date(feature.properties.time).toLocaleString()}
                `);
            }
        }).addTo(earthquakeLayer);
    });

    function getColor(depth) {
        return depth > 90 ? '#FF0000' :    // Red for depth > 90
               depth > 70 ? '#FF4500' :    // Orange-Red for depth > 70
               depth > 50 ? '#FFA500' :    // Orange for depth > 50
               depth > 30 ? '#FFD700' :    // Gold for depth > 30
               depth > 10 ? '#ADFF2F' :    // Green-Yellow for depth > 10
                            '#00FF00';      // Green for any other depth
    }

// Function to get marker radius based on magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
}

// Create legend control and specify its position
let legend = L.control({ position: 'bottomright' });

// Function to add legend to the map
legend.onAdd = function(map) {
    // Create a div element to act as a container for our legend. This container will hold the visual representation of the legend
    // Using a <div> element allows us to manipulate its appearance and content using HTML and CSS, providing flexibility in how we design and style the legend
    let div = L.DomUtil.create('div', 'legend'); //creates a new <div> element with the class name "legend" and assigns it to the variable div

    // Define legend content directly based on depth conditions
    div.innerHTML =
        '<i style="background:#FF0000"></i> 90+<br>' +
        '<i style="background:#FF4500"></i> 70&ndash;90<br>' +
        '<i style="background:#FFA500"></i> 50&ndash;70<br>' +
        '<i style="background:#FFD700"></i> 30&ndash;50<br>' +
        '<i style="background:#ADFF2F"></i> 10&ndash;30<br>' +
        '<i style="background:#00FF00"></i> 0&ndash;10';

    return div; // Return the div element
};

// Add legend to the map
legend.addTo(myMap);



// URL to fetch the tectonic plates GeoJSON data
let platesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Fetching the tectonic plates GeoJSON data.
// It is not required to explicitly specify how to fetch the coordinates. 
// Leaflet's L.geoJson() function handles that based on the GeoJSON structure provided in platesData.
d3.json(platesLink).then(function(platesData) {
    // Add tectonic plates layer to the map
    L.geoJson(platesData, {
        style: {
            color: "#FFA500", // Orange color for tectonic plate boundaries
            weight: 2, // Line weight
            opacity: 0.8 // Line opacity
        }
    }).addTo(platesLayer);
});