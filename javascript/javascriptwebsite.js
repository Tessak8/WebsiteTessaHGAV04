
//leafletmap
//initialize the map         
const map = L.map('leafletmap').setView([41.29246, 12.5736108], 6);
//Create baselayer - tiles         
const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 19
});

backgroundMap.addTo(map);


//toevoegen kaartlaag van RNDT website WMS digital elevation model
var dem = L.tileLayer.wms('https://tinitaly.pi.ingv.it/TINItaly_1_1/ows?', {
  'layers': 'tinitaly_dem',
  'styles': 'raster',
  'srs': 'EPSG:84',
  'format': 'image/png',
  'opacity': 0.5
})



//toevoegen kaartlaag van RNDT website WMS hillshade
var hillshade = L.tileLayer.wms('https://tinitaly.pi.ingv.it/TINItaly_1_1/ows?', {
  'layers': 'tinitaly_hshd',
  'styles': 'raster',
  'srs': 'EPSG:84',
  'format': 'image/png',
  'opacity': 0.5
})

//aanmaken van legenda knop in de leaflet met daarin de kaartlagen
var overlays = {
  "Digital elevation model": dem,
  "Hillshade": hillshade
};

const controls = L.control.layers(overlays, {
})

controls.addTo(map);
controls.expand()



//openlayersmap

const geojsonObject = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          12.45380081564312,
          41.90329521702378
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          12.461852157145358,
          43.93316842817623
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          8.971395849005205,
          45.968172836006204
        ],
        "type": "Point"
      }
    }
  ]
}

const vectorSource = new ol.source.Vector({
  url: './data/italie_plaatsen.geojson',
  format: new ol.format.GeoJSON(),
});

const style = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 1,
    fill: null,
    stroke: new ol.style.Stroke({ color: '#FF9933', width: 15 }),
  })
});

const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: style
});


const openlayersmap = new ol.Map({
  target: "openlayersmap",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([12.496366, 41.902782]),
    zoom: 5
  })


});



//ESRI kaart
require(
  ["esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
  ], function (esriConfig, WebMap, MapView, ScaleBar, Legend) {


    esriConfig.apiKey = "AAPK61fcd36f236d4b558bdc5e3748d5e3b6XgGhr7Sf5chgiF9LX2Oo7wsER2zzWahjRu5bxX4uul_aVJXnJrsrkzFnmRez9_FN";

    const esriKaart = new WebMap({
      portalItem: {
        id: "389547ea18c34aa78f46fc7b8786a189"
      }
    });


    const view = new MapView({
      map: esriKaart,
      center: [12.496366, 41.902782], // Longitude, latitude
      zoom: 4, // Zoom level
      container: "esriKaart" // Div element
    });

    const scalebar = new ScaleBar({
      view: view
    });

    view.ui.add(scalebar, "bottom-right");

    const legend = new Legend({
      view: view,
      style: "card",
    })


    // Legenda toevoegen ArcGIS kaart
    view.ui.add(legend, "bottom-left");

  });


//Maplibre kaart
var maplibrekaart = new maplibregl.Map({
  container: 'maplibrekaart',
  style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
  center: [12.496366, 41.902782], // starting position [lng, lat]
  zoom: 4.5 // starting zoom

})

const popup = new maplibregl.Popup({ offset: 25 }).setText(
  'Rome');

const marker = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([12.496365500000024, 41.90278349999999])
  .setPopup(popup)
  .addTo(maplibrekaart);



const popup2 = new maplibregl.Popup({ offset: 25 }).setText(
  'Florence');

const marker2 = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([11.255814, 43.769562])
  .setPopup(popup2)
  .addTo(maplibrekaart);



const popup3 = new maplibregl.Popup({ offset: 25 }).setText(
  'Venetië');

const marker3 = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([12.327145, 45.438759])
  .setPopup(popup3)
  .addTo(maplibrekaart);


const popup4 = new maplibregl.Popup({ offset: 25 }).setText(
  'Milaan');

const marker4 = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([9.188540, 45.464664])
  .setPopup(popup4)
  .addTo(maplibrekaart);


const popup5 = new maplibregl.Popup({ offset: 25 }).setText(
  'Turijn');

const marker5 = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([7.742615, 45.116177])
  .setPopup(popup5)
  .addTo(maplibrekaart);


//Leaflet kaart//


const leafLet = L.map('leafletmap2').setView([41.902782, 12.496366], 5);
var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(leafLet);

L.tileLayer.wms('http://localhost:8001/geoserver/ows', {
  'layers': 'webcartografieHGAV:italieprovincies',
  'styles': 'polygon',
  'srs': 'CRS:84',
  'format': 'image/png',
  'opacity': '0,5',
  'transparent': true,

}).addTo(leafLet);


//leafletmap
//initialize the map         
const zesdeleafletkaart = L.map('leafletmap3').setView([41.29246, 12.5736108], 6);
//Create baselayer - tiles         
const backgroundMap3 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 19
});

backgroundMap3.addTo(zesdeleafletkaart);


let mijngeojsonlaag = L.geoJSON().addTo(zesdeleafletkaart);

let woonplaatsen = ['Haarlemmermeer', 'Almere', 'Amsterdam'];
let woonplaatsNaam = woonplaatsen[2];

//Met de free service een ID ophalen
fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${woonplaatsNaam}&rows=10`)
  .then(response => response.json())
  .then(data => {
    //Pak het id nr van het eerste object wat terug komt
    console.log(data.response.docs[0].id);
    let id = data.response.docs[0].id

    //vraag de data op en zet op de kaart
    tekenDataopKaart(id);
  })

//Aan de hand van een ID de geometrie ophalen en op de kaart zetten. En vliegen naar die locatie.
function tekenDataopKaart(woonplaatsId) {
  const mijneersteAPIrequest = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=${woonplaatsId}&wt=json&fl=*`

  fetch(mijneersteAPIrequest, {})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log(data.response.docs[0].geometrie_ll)

      //Geojson naar Leaflet laag
      let geojsonFeature = Terraformer.wktToGeoJSON(data.response.docs[0].geometrie_ll);
      mijngeojsonlaag.addData(geojsonFeature);

      //Center coordinaten voor zoomen naar center
      let centerCoordinates = Terraformer.wktToGeoJSON(data.response.docs[0].centroide_ll);
      console.log(centerCoordinates);
      zesdeleafletkaart.flyTo(centerCoordinates.coordinates.reverse());

    }

    )
}