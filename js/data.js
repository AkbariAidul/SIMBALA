console.log("[SIMBALA] data.js dimuat");

// Placeholder untuk rawanBanjirGeoJSON (ganti dengan data asli)
const rawanBanjirGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "nama": "Zona A", "tingkat": "Tinggi" },
      "geometry": { "type": "Polygon", "coordinates": [[[-2.95, 114.73], [-2.94, 114.74], [-2.95, 114.75], [-2.95, 114.73]]] }
    },
    {
      "type": "Feature",
      "properties": { "nama": "Zona B", "tingkat": "Sedang" },
      "geometry": { "type": "Polygon", "coordinates": [[[-2.96, 114.74], [-2.95, 114.75], [-2.96, 114.76], [-2.96, 114.74]]] }
    }
  ]
};