import DragAndDrop from "ol/interaction/DragAndDrop.js"
import { GeoJSON, KML } from "ol/format.js"
import { SNT } from "../lib/SNT"
import { buildVectorSource } from "./buildVectorSource"
import { buildVectorLayer } from "./buildVectorLayer"

let dragAndDropInteraction

export function setupDragAndDrop(map) {
  if (dragAndDropInteraction) {
    map.removeInteraction(dragAndDropInteraction)
  }
  dragAndDropInteraction = new DragAndDrop({
    formatConstructors: [GeoJSON, KML, SNT]
  })
  dragAndDropInteraction.on("addfeatures", (event) => {
    const filename = event.file.name
    const format = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase()

    const vectorSource = buildVectorSource(event.features, format, filename)
    const vectorLayer = buildVectorLayer(vectorSource, format, filename)
    map.addLayer(vectorLayer)
    map.getView().fit(vectorSource.getExtent(), {
      padding: [100, 100, 100, 100],
      duration: 200
    })
  })
  map.addInteraction(dragAndDropInteraction)
}
