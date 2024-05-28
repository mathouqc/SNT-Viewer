import { Vector as VectorLayer } from "ol/layer.js";
import { Stroke, Style } from "ol/style";
import { updateSettings } from "../setup/setupSettings";

/**
 * Apply custom style and properties to a vector source to create a vector layer
 * @param {VectorSource} vectorSource
 * @param {Map} map
 * @param {string} format - Format of the file (snt, kml or geojson)
 * @param {string} name - Name of the layer (filename for example)
 * @return {VectorLayer}
 */
export function buildLineLayer(map, vectorSource, format, name) {
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  // Custom properties
  vectorLayer.dataType = "lines";
  vectorLayer.name = name;
  vectorLayer.layerActive = true;

  map.addLayer(vectorLayer);

  // Update map settings
  updateSettings(map);
}

/**
 * Create style function to change color based on status if format is SNT
 * @param {boolean} showFlown show flown lines if true
 * @param {number} width width of the lines
 */
export function createLineStyleFunction(showFlown, width) {
  return (feature) => {
    let color = "#000bd9"; // Blue
    if (feature.get("status") === "Acquis" && !showFlown) {
      color = [0, 0, 0, 0]; // Transparent
    } else if (feature.get("status") === "Acquis") {
      color = "#2abf1d"; // Green
    }

    return new Style({
      stroke: new Stroke({
        color: color,
        width: width,
      }),
    });
  };
}
