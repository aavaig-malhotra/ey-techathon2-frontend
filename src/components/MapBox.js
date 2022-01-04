import React, { useEffect, useState } from 'react';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

function MapBox({ area = 'india', url = 'aavaig2069.3d85qak1' }) {
  const AreaToUrlMap = {
    india: 'aavaig2069.3d85qak1',
    'himachal pradesh': 'aavaig2069.cf5xtz0n',
    gujarat: 'aavaig2069.32bs6f7z',
    'tamil nadu': 'aavaig2069.8ty6aufg',
  };

  const loadMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWF2YWlnMjA2OSIsImEiOiJja3gyNjhkdG0xOTljMnBueTluZnA0YzFzIn0.eZB9Au7ertDodRUyEVQHZQ';
    var map = new mapboxgl.Map({
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      // style: 'mapbox://styles/mapbox/light-v10',
      center: [78.9629, 20.5937],
      zoom: 3.5,
      minZoom: 3,
    });

    map.on('load', () => {
      const layers = map.getStyle().layers;

      let firstSymbolId;
      for (const layer of layers) {
        if (layer === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.addSource('drone', {
        type: 'raster',
        url: `mapbox://${AreaToUrlMap[area]}`,
      });

      map.addLayer({
        id: 'drone-layer',
        type: 'raster',
        source: 'drone',
      });
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  //   return <div id='mapbox-map'></div>;
  return (
    <div id='mapbox-map' style={{ height: '100%' }}>
      Mapbox
    </div>
  );
}

export default MapBox;
