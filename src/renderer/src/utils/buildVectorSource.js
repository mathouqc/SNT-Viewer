import { Vector as VectorSource } from "ol/source.js"
import { LineString } from "ol/geom"
import { Feature } from "ol"

/**
 * Create lines with points from an SNT file or filter features from other formats
 * @param {Array<Feature>} features
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} name - Name of the source (filename for example)
 * @return {VectorSource}
 */
export function buildVectorSource(features, format, name) {
  let newFeatures

  if (format === "SNT") {
    newFeatures = createLineFromPoints(features, name)
  } else {
    newFeatures = features
  }

  return new VectorSource({
    name: name,
    features: newFeatures
  })
}

/**
 * Group point features by no_ligne and status, then return a new line feature
 * @param {Array<Feature>} features
 * @param {string} name - Name of the source (filename for example)
 * @return {Array<Feature>}
 */
function createLineFromPoints(features, name) {
  const lignes = {}
  let id = 0

  let last_no_photo
  let last_no_ligne
  let last_status

  for (const feature of features) {
    const { no_ligne, no_photo, status } = feature.getProperties()
    const coords = feature.getGeometry().getCoordinates()

    if (
      no_ligne === last_no_ligne &&
      status === last_status &&
      Number(no_photo) === last_no_photo + 1
    ) {
      lignes[id].coords.push(coords)
    } else {
      id += 1
      lignes[id] = {
        no_ligne: no_ligne,
        status: status,
        coords: [coords]
      }
    }

    last_no_photo = Number(no_photo)
    last_no_ligne = no_ligne
    last_status = status
  }

  const lineFeatures = []
  for (const ligne of Object.values(lignes)) {
    const { no_ligne, status, coords } = ligne
    lineFeatures.push(
      new Feature({
        name: name,
        geometry: new LineString(coords),
        no_ligne: no_ligne,
        status: status
      })
    )
  }

  return lineFeatures
}
