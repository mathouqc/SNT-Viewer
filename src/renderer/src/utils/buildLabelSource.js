import { Vector as VectorSource } from "ol/source.js"
import { Feature } from "ol"
import { Point } from "ol/geom"
import proj4 from "proj4"

/**
 * Create point features at the center of the line with rotation and offset properties
 * @param {VectorSource} lineVectorSource
 * @param {string} format - Format of the file (SNT, KML or GEOJSON)
 * @param {string} name - Name of the source (filename for example)
 * @returns {VectorSource}
 */
export function buildLabelSource(lineVectorSource, format, name) {
  const features = []
  for (const line of lineVectorSource.getFeatures()) {
    const lineString = line.getGeometry()

    const [first_x, first_y] = proj4("EPSG:3857", lineString.getCoordinates().shift())
    const [last_x, last_y] = proj4("EPSG:3857", lineString.getCoordinates().pop())

    const no_ligne = line.get("no_ligne")

    const rotation = -Math.atan2(last_y - first_y, last_x - first_x)

    features.push(
      new Feature({
        geometry: new Point(lineString.getCoordinateAt(1 / 2)),
        no_ligne: no_ligne,
        rotation: rotation
      })
    )
  }

  return new VectorSource({
    name: name,
    features: format === "SNT" ? features : undefined
  })
}
