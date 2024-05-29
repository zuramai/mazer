// init map
var map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([110.3803253, -7.7945047]),
		zoom: 12
	})
});

// add vector layer
var vectorLayer = new ol.layer.Vector({
	source: new ol.source.Vector({
		features: [
			new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat([110.3647631, -7.8013849])),
				name: 'Yogyakarta, Indonesia'
			})
		]
	})
});

// set style for vector layer
vectorLayer.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
		src: 'https://openlayers.org/en/latest/examples/data/icon.png'
	})
}));

map.addLayer(vectorLayer);

// popup
const element = document.getElementById('popup');

const popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
});
map.addOverlay(popup);

let popover;
function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
}

// display popup on click
map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  disposePopover();
  if (!feature) {
    return;
  }
  popup.setPosition(evt.coordinate);
  popover = new bootstrap.Popover(element, {
    placement: 'top',
    html: true,
    content: feature.get('name'),
  });
  popover.show();
});

// scale line
map.addControl(new ol.control.ScaleLine());