// init map
var map = L.map('map', {
	center: [-7.7945047, 110.3803253],
	zoom: 12
});

// set map tiles source
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	maxZoom: 18
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// add tiles to map
osm.addTo(map);

// add marker
var marker = L.marker([-7.8013849, 110.3647631]);
marker.addTo(map)
	.bindPopup('Yogyakarta, Indonesia')
	.openPopup();

// scale bar
L.control.scale({
	imperial: false
}).addTo(map);

// add layer control
var baseMaps = {
	"OSM": osm,
	"Esri World Imagery": Esri_WorldImagery
};

var overlayMaps = {
	"Marker": marker
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
