import { buildVectorSource } from "../utils/buildVectorSource"
import { buildVectorLayer } from "../utils/buildVectorLayer"
import { buildLabelSource } from "../utils/buildLabelSource"
import { buildLabelLayer } from "../utils/buildLabelLayer"

/**
 * Create lines from points from SNT file or filter features from other formats
 * @param {Array<Feature>} features
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} name - Name of the source (filename for example)
 * @return {Array}
 */
export function createLayerFromPoints(pointFeatures, format, name) {
  // Create lines from points
  const vectorSource = buildVectorSource(pointFeatures, format, name)
  // Add style to lines
  const vectorLayer = buildVectorLayer(vectorSource, format, name)

  // Create label points from lines
  const labelSource = buildLabelSource(vectorSource, format, name)
  // Add text to label points
  const labelLayer = buildLabelLayer(labelSource, format, name)

  return [vectorLayer, vectorSource, labelLayer, labelSource]
}
