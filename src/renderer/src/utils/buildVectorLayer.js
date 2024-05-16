import { Vector as VectorLayer } from "ol/layer.js"
import { Stroke, Style } from "ol/style"

/**
 * Apply custom style and properties to a vector source to create a vector layer
 * @param {VectorSource} vectorSource
 * @param {string} format - Format of the file (snt, kml or geojson)
 * @param {string} name - Name of the layer (filename for example)
 * @return {VectorLayer}
 */
export function buildVectorLayer(vectorSource, format, name) {
  return new VectorLayer({
    name: name,
    dataType: "lines",
    source: vectorSource,
    style: format === "SNT" ? styleFunction : undefined
  })
}

/**
 * Create style function to change color based on status if format is SNT
 */
function styleFunction(feature) {
  return new Style({
    stroke: new Stroke({
      color: feature.get("status") === "Acquis" ? "#2abf1d" : "#000bd9",
      width: 3
    })
  })
}
