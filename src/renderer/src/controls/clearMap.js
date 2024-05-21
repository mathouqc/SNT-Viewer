/**
 * Function to remove all layers from the map.
 * @param {Map} map
 */
export function clearMap(map) {
  map
    .getLayers()
    .getArray()
    .filter((layer) => layer.dataType === "lines")
    .forEach((layer) => {
      map.removeLayer(layer)
    })

  map
    .getOverlays()
    .getArray()
    .filter((overlay) => overlay.dataType === "label")
    .forEach((overlay) => {
      map.removeOverlay(overlay)
    })
}
