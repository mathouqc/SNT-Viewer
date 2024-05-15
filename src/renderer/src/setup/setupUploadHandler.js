/**
 * Function to handle uploaded files.
 * Users can click the upload button on the map to load data.
 * Similar to setupDragAndDrop.
 */

import { SNT } from "../lib/SNT"
import { buildVectorSource } from "../utils/buildVectorSource"
import { buildVectorLayer } from "../utils/buildVectorLayer"
import { buildLabelSource } from "../utils/buildLabelSource"
import { buildLabelLayer } from "../utils/buildLabelLayer"

export function setupUploadHandler(map) {
  document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        handleContent(map, evt.target.result)
      }
      reader.readAsText(file)
    }
  })
}

function handleContent(map, text) {
  const snt = new SNT()
  const features = snt.readFeatures(text)

  const filename = "tmp"
  const format = "SNT"

  const vectorSource = buildVectorSource(features, format, filename)
  const vectorLayer = buildVectorLayer(vectorSource, format, filename)

  const labelSource = buildLabelSource(vectorSource, format, filename)
  const labelLayer = buildLabelLayer(labelSource, format, filename)

  map.addLayer(vectorLayer)
  map.getView().fit(vectorSource.getExtent(), {
    padding: [100, 100, 100, 100],
    duration: 200
  })
  map.addLayer(labelLayer)
}
