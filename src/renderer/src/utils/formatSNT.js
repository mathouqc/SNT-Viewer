import { createLayerFromPoints } from "../utils/createLayerFromPoints"
import { buildLabelOverlays } from "../utils/buildLabelOverlays"

export function formatSNT(map, features, format, filename) {
  const { vectorLayer, vectorSource, labelSource } = createLayerFromPoints(
    features,
    format,
    filename
  )

  buildLabelOverlays(map, labelSource)

  map.addLayer(vectorLayer)
  map.getView().fit(vectorSource.getExtent(), {
    padding: [10, 10, 10, 10],
    duration: 200
  })
}
