import { Vector as VectorLayer } from "ol/layer.js";
import { Stroke, Style } from "ol/style";

/**
 * Apply custom style and properties to a vector source to create a vector layer
 * @param {VectorSource} vectorSource
 * @param {string} format - Format of the file (snt, kml or geojson)
 * @param {string} name - Name of the layer (filename for example)
 * @return {VectorLayer}
 */
export function buildVectorLayer(vectorSource, format, name) {
  const styleFunction = createLineStyleFunction(
    document.getElementById("linesize-input") ? document.getElementById("linesize-input").value : 3,
  );

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: format === "SNT" ? styleFunction : undefined,
  });
  vectorLayer.name = name;
  vectorLayer.dataType = "lines";
  return vectorLayer;
}

/**
 * Create style function to change color based on status if format is SNT
 */
export function createLineStyleFunction(width) {
  return (feature) => {
    return new Style({
      stroke: new Stroke({
        color: feature.get("status") === "Acquis" ? "#2abf1d" : "#000bd9",
        width: width,
      }),
    });
  };
}
