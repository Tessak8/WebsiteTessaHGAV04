
//leafletmap
  //initialize the map         
  const map = L.map('leafletmap').setView([41.29246, 12.5736108], 6);
  //Create baselayer - tiles         
  const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 19});

  backgroundMap.addTo(map);


  let mijngeojsonlaag = L.geoJSON().addTo(map);

    let woonplaatsen = ['Haarlemmermeer', 'Almere', 'Amsterdam'];
    let woonplaatsNaam = woonplaatsen[0];
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
    function tekenDataopKaart(woonplaatsId){
        const mijneersteAPIrequest = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=gem-bcb08af4ae8607401e9aa869d4e573c0&wt=json&fl=*'
    
        fetch(mijneersteAPIrequest, {})
        .then(response => response.json ())
        .then (data => {
            console.log(data)
            console.log(data.response.docs[0].geometrie_ll)
    
            //Geojson naar Leaflet laag
            let geojsonFeature = Terraformer.wktToGeoJSON (data.response.docs[0].geometrie_ll);
            mijngeojsonlaag.addData(geojsonFeature);
            
            //Center coordinaten voor zoomen naar center
            let centerCoordinates = Terraformer.wktToGeoJSON (data.response.docs[0].centroide_ll);
            console.log(centerCoordinates);
            map.flyTo(centerCoordinates.coordinates.reverse());
    
        }
        
        )  
    }

    //toevoegen kaartlaag van geoserver
    L.tileLayer.wms('http://localhost:8001/geoserver/ows?' , {
        'layers': 'webcartografieHGAV:gemeente_2021_v1',
        'styles': 'polygon',
        'srs': 'ESPG:28992',
        'format': 'image/png',
        'opacity': 0.5

    }) .addTo(map)



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
    features: new ol.format.GeoJSON().readFeatures(geojsonObject),
  });

const style = new ol.style.Style({
    image : new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({color: 'red', width: 1}),
  })});


const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: style
  });


const openlayersmap = new ol.Map({
    target:"openlayersmap",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM( )
        }),
        vectorLayer
    ], 
    view: new ol.View({
        center: ol.proj.fromLonLat([5.84447, 51.04011]), 
        zoom:15
    })

    
});














  //ESRI kaart
require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {

	esriConfig.apiKey = "AAPK61fcd36f236d4b558bdc5e3748d5e3b6XgGhr7Sf5chgiF9LX2Oo7wsER2zzWahjRu5bxX4uul_aVJXnJrsrkzFnmRez9_FN";

	const esriKaart = new Map({
		basemap: "arcgis-topographic" // Basemap layer service
	});

	const view = new MapView({
		map: esriKaart,
		center: [5.2213, 51.7160], // Longitude, latitude
		zoom: 8, // Zoom level
		container: "esriKaart" // Div element
	});
});


//Maplibre kaart
var maplibrekaart = new maplibregl.Map({
    container: 'maplibrekaart',
    style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
    center: [12.496366, 41.902782], // starting position [lng, lat]
    zoom: 4.5 // starting zoom
    });