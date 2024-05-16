import { Vector as VectorLayer } from "ol/layer.js"
import { Style, Text } from "ol/style"

/**
 * Add text style and properties to the label vector source to display line number
 * @param {VectorSource} labelSource
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} name - Name of the layer (filename for example)
 * @returns {VectorLayer}
 */
export function buildLabelLayer(labelSource, format, name) {
  if (format !== "SNT") {
    return new VectorLayer({
      name: name,
      source: labelSource
    })
  }

  return new VectorLayer({
    name: name,
    source: labelSource,
    style: labelStyleFunction
  })
}

function labelStyleFunction(feature) {
  const { no_ligne, rotation } = feature.getProperties()
  return new Style({
    text: new Text({
      text: no_ligne,
      scale: 2,
      rotation: rotation
    })
  })
}
