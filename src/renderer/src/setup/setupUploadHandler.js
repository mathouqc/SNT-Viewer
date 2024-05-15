import { SNT } from "../lib/SNT"
import { createLayerFromPoints } from "../utils/layerFromPoints"

/**
 * Function to handle uploaded files.
 * Users can click the upload button on the map to load data.
 * Similar to setupDragAndDrop.
 * @param {Map} map
 */
export function setupUploadHandler(map) {
  document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0]
    if (file) {
      const filename = file.name
      const format = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase()

      const reader = new FileReader()
      reader.onload = (event) => {
        const textData = event.target.result
        handleContent(map, textData, filename, format)
      }
      reader.readAsText(file)
    }
  })
}

function handleContent(map, text, format, filename) {
  const snt = new SNT()
  const features = snt.readFeatures(text)

  const [vectorLayer, vectorSource, labelLayer] = createLayerFromPoints(features, format, filename)

  map.addLayer(vectorLayer)
  map.getView().fit(vectorSource.getExtent(), {
    padding: [100, 100, 100, 100],
    duration: 200
  })
  map.addLayer(labelLayer)
}
