import { createLayersFromSNT } from "../utils/createLayersFromSNT";

/**
 * Create layers from SNT features, then add them to the map and zoom to extend
 * @param {Map} map
 * @param {Array<Feature>} features - Features from the SNT reader
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} filename - Name of the source file
 */
export function loadSNT(map, features, format, filename) {
  // Skip if already on the map
  for (const layer of map.getLayers().getArray()) {
    if (layer.name === filename) return;
  }

  const { vectorLayer, vectorSource } = createLayersFromSNT(map, features, format, filename);

  map.addLayer(vectorLayer);
  map.getView().fit(vectorSource.getExtent(), {
    padding: [10, 10, 10, 10],
    duration: 200,
  });
}
