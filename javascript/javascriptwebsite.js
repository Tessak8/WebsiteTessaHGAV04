
//openlayersmap

const openlayersmap = new ol.Map({
    target:"openlayersmap",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM( )
        })
    ], 
    view: new ol.View({
        center: ol.proj.fromLonLat([5.84447, 51.04011]), 
        zoom:15
    })
});