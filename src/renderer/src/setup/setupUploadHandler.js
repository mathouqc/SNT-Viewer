import { SNT } from "../lib/SNT"
import { loadSNT } from "../utils/loadSNT"

/**
 * Function to handle uploaded files.
 * Users can click the upload button on the map to load data.
 * Similar to setupDragAndDrop.
 * @param {Map} map
 */
export function setupUploadHandler(map) {
  document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0]

    const filename = file.name
    const format = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase()

    if (file && format === "SNT") {
      const reader = new FileReader()
      reader.onload = (event) => {
        const textData = event.target.result
        handleContent(map, textData, format, filename)
      }
      reader.readAsText(file)
    }
  })
}

function handleContent(map, text, format, filename) {
  const snt = new SNT()
  const features = snt.readFeatures(text)

  loadSNT(map, features, format, filename)
}
