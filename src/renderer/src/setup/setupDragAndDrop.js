import DragAndDrop from "ol/interaction/DragAndDrop.js";
// import { GeoJSON, KML } from "ol/format.js"
import { SNT } from "../lib/SNT";
import { loadSNT } from "../utils/loadSNT";

let dragAndDropInteraction;

/**
 * Function to add DragAndDrop capabilities to the map.
 * Users can drag and drop files on the map to load data.
 * Similar to setupUploadHandler.
 * @param {Map} map
 */
export function setupDragAndDrop(map) {
  if (dragAndDropInteraction) {
    map.removeInteraction(dragAndDropInteraction);
  }
  dragAndDropInteraction = new DragAndDrop({
    // formatConstructors: [GeoJSON, KML, SNT]
    formatConstructors: [SNT],
  });
  dragAndDropInteraction.on("addfeatures", (event) => {
    const filename = event.file.name;
    const format = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();

    loadSNT(map, event.features, format, filename);
  });
  map.addInteraction(dragAndDropInteraction);
}
