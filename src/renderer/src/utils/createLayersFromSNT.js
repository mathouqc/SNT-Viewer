import { buildVectorSource } from "../utils/buildVectorSource"
import { buildVectorLayer } from "../utils/buildVectorLayer"
import { buildLabelSource } from "../utils/buildLabelSource"
import { buildLabelOverlays } from "./buildLabelOverlays"

/**
 * Create lines from points from SNT file or filter features from other formats
 * @param {Map} map
 * @param {Array<Feature>} pointFeatures - Point features from the source
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} name - Name for the layers (filename for example)
 * @return {Object}
 */
export function createLayersFromSNT(map, pointFeatures, format, name) {
  // Create lines from points
  const vectorSource = buildVectorSource(pointFeatures, format, name)
  // Add style to lines
  const vectorLayer = buildVectorLayer(vectorSource, format, name)

  // Create label points from lines
  const labelSource = buildLabelSource(vectorSource, format, name)

  // Create label overlays from points
  buildLabelOverlays(map, labelSource)

  return {
    vectorLayer: vectorLayer,
    vectorSource: vectorSource
  }
}
