import * as Extend from "ol/extent"

/**
 * Zoom to the extend of the features
 * @param {Map} map
 */
export function zoomExtend(map) {
  const layers = map
    .getLayers()
    .getArray()
    .filter((layer) => layer.get("dataType") === "lines")

  const extend = Extend.createEmpty()
  layers.forEach((layer) => {
    Extend.extend(extend, layer.getSource().getExtent())
  })

  map.getView().fit(extend, {
    padding: [10, 10, 10, 10],
    duration: 200
  })
}
