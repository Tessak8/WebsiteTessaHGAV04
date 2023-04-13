
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
  style: 'https://api.maptiler.com/maps/bright-v2/style.json?key=VqIB07P2FUCOQPgSuC0w', // stylesheet location
  center: [12.496366, 41.902782], // starting position [lng, lat]
  zoom: 4.5 // starting zoom

})



const popup1 = new maplibregl.Popup({ offset: 25 }).setText(
  '1. Venetië');

const marker1 = new maplibregl.Marker({
  color: '#00A5E3'
})
  .setLngLat([12.327145, 45.438759])
  .setPopup(popup1)
  .addTo(maplibrekaart);

const popup2 = new maplibregl.Popup({ offset: 25 }).setText(
  '2. Bolzano');

const marker2 = new maplibregl.Marker({
  color: '#FFD872'
})
  .setLngLat([11.350000, 46.500000])
  .setPopup(popup2)
  .addTo(maplibrekaart);


const popup3 = new maplibregl.Popup({ offset: 25 }).setText(
  '3. Rome');

const marker3 = new maplibregl.Marker({
  color: '#FF96C5'
})
  .setLngLat([12.496365500000024, 41.90278349999999])
  .setPopup(popup3)
  .addTo(maplibrekaart);



const popup4 = new maplibregl.Popup({ offset: 25 }).setText(
  '4. Trento');

const marker4 = new maplibregl.Marker({
  color: '#6C88C4'
})
  .setLngLat([11.116667, 46.066666])
  .setPopup(popup4)
  .addTo(maplibrekaart);



const popup5 = new maplibregl.Popup({ offset: 25 }).setText(
  '5. Verona');

const marker5 = new maplibregl.Marker({
  color: '#FF5768'
})
  .setLngLat([10.983333, 45.433334])
  .setPopup(popup5)
  .addTo(maplibrekaart);


const popup6 = new maplibregl.Popup({ offset: 25 }).setText(
  '6. Rimini');

const marker6 = new maplibregl.Marker({
  color: '#00B0BA'
})
  .setLngLat([12.568333, 44.059444])
  .setPopup(popup6)
  .addTo(maplibrekaart);


const popup7 = new maplibregl.Popup({ offset: 25 }).setText(
  '7. Milaan');

const marker7 = new maplibregl.Marker({
  color: '#4DD091'
})
  .setLngLat([9.188540, 45.464664])
  .setPopup(popup7)
  .addTo(maplibrekaart);


const popup8 = new maplibregl.Popup({ offset: 25 }).setText(
  '8. Florence');

const marker8 = new maplibregl.Marker({
  color: '#FFA23A'
})
  .setLngLat([11.255814, 43.769562])
  .setPopup(popup8)
  .addTo(maplibrekaart);


const popup9 = new maplibregl.Popup({ offset: 25 }).setText(
  '9. Napels');

const marker9 = new maplibregl.Marker({
  color: '#967ADC'
})
  .setLngLat([14.305573, 40.853294])
  .setPopup(popup9)
  .addTo(maplibrekaart);


const popup10 = new maplibregl.Popup({ offset: 25 }).setText(
  '10. Brescia');

const marker10 = new maplibregl.Marker({
  color: '##2596be'
})
  .setLngLat([10.211802, 45.541553])
  .setPopup(popup10)
  .addTo(maplibrekaart);




//foto carrousel bij de tabel van het werelderfgoed
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}



//Leaflet kaart//
const leafLet = L.map('leafletmap2').setView([41.902782, 12.496366], 5);
var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(leafLet);

//Toevoegen van geoserver aan leaflet kaart //

L.tileLayer.wms('http://localhost:8001/geoserver/ows', {
  'layers': 'webcartografieHGAV:italieprovincies',
  'styles': 'polygon',
  'srs': 'CRS:84',
  'format': 'image/png',
  'opacity': '0,5',
  'transparent': true,

}).addTo(leafLet);

//Toevoegen van zelfgemaakte cirkels aan de leaflet kaart, zodat hij niet leeg is//
var circle1 = L.circle([45.464664, 9.188540], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle1.bindPopup("Milaan - Risotto");


var circle2 = L.circle([44.414165, 8.942184], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle2.bindPopup("Genua - Pesto");


var circle3 = L.circle([44.801472, 10.328000], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle3.bindPopup("Parma - Parma ham");

var circle4 = L.circle([41.902782, 12.496366], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle4.bindPopup("Rome - Pasta carbonara");

var circle5 = L.circle([40.853294, 14.305573], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle5.bindPopup("Napels - Pizza");

var circle6 = L.circle([45.438759, 12.327145], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle6.bindPopup("Venetië - Tiramisu");

var circle7 = L.circle([46.066666, 11.116667], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle7.bindPopup("Trente - Polenta");

var circle8 = L.circle([44.498955, 11.327591], {
  color: 'blue',
  fillColor: '#66CCFF',
  fillOpacity: 0.5,
  radius: 10000
}).addTo(leafLet);

circle8.bindPopup("Bologna - Lasagne bolognese");



//leafletmap
//initialize the map         
const zesdeleafletkaart = L.map('leafletmap3').setView([41.29246, 12.5736108], 8);
//Create baselayer - tiles         
const backgroundMap3 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 19
});

backgroundMap3.addTo(zesdeleafletkaart);


let mijngeojsonlaag = L.geoJSON().addTo(zesdeleafletkaart);

let woonplaatsen = ['Schiphol', 'Amsterdam', 'Rotterdam', 'Eindhoven', 'Maastricht'];
let woonplaatsNaam = woonplaatsen[1];

for (let i = 0; i < woonplaatsen.length; i++) {
  const element = woonplaatsen[i];
  var mijnButton = document.createElement("button");
  mijnButton.className = "mijnknoppen"
  let textnode = document.createTextNode(woonplaatsen[i]);
  mijnButton.appendChild(textnode);
  mijnButton.onclick = function () { vraagWoonplaatsOp(woonplaatsen[i]) }
  document.getElementById('knoppen').appendChild(mijnButton);
}


function vraagWoonplaatsOp(woonplaatsNaam) {
  console.log('Test')

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
};

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






