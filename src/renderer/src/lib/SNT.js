/**
 * Openlayers format class to read SNT files.
 */

import TextFeature from "ol/format/TextFeature"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"

export class SNT extends TextFeature {
  readFeaturesFromText(text) {
    const features = []
    for (const line of text.split("\n")) {
      let status = line.includes("*") ? "Acquis" : "Ouvert"
      let [ligne, photo, lat, lon] = line.slice(1).split(" ").slice(0, 4)

      // Skip empty line
      if (!(ligne || photo || lat || lon)) {
        continue
      }

      // latitude DMS to DD
      let lat_sign = lat.startsWith("S") ? -1 : 1
      let lat_deg = Number(lat.slice(1, 3))
      let lat_min = Number(lat.slice(3, 5))
      let lat_sec = Number("0." + lat.slice(6, 11)) * 60

      let lat_dd = lat_sign * (lat_deg + lat_min / 60 + lat_sec / 3600)

      // longitude DMS to DD
      let lon_sign = lon.startsWith("W") ? -1 : 1
      let lon_deg = Number(lon.slice(1, 4))
      let lon_min = Number(lon.slice(4, 6))
      let lon_sec = Number("0." + lon.slice(7, 12)) * 60

      let lon_dd = lon_sign * (lon_deg + lon_min / 60 + lon_sec / 3600)

      // Create feature
      const feature = new Feature({
        geometry: new Point([lon_dd, lat_dd]),
        no_ligne: ligne,
        no_photo: photo,
        status: status
      })

      features.push(feature)
    }
    return features
  }
}
