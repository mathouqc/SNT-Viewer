import TileLayer from "ol/layer/Tile"

/**
 * Function to remove all layers from the map.
 * @param {Map} map
 */
export function clearMap(map) {
  map
    .getLayers()
    .getArray()
    .filter((layer) => !(layer instanceof TileLayer))
    .forEach((layer) => {
      map.removeLayer(layer)
    })
}
