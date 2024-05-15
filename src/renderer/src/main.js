import "../assets/style.scss"
import { Map, View } from "ol"
import { Tile as TileLayer } from "ol/layer.js"
import { OSM } from "ol/source.js"
import { useGeographic } from "ol/proj"
import { DragRotateAndZoom, defaults as defaultInteractions } from "ol/interaction.js"
import { setupDragAndDrop } from "./setup/setupDragAndDrop"
import { setupUploadHandler } from "./setup/setupUploadHandler"
import { setupPopup } from "./setup/setupPopup"
import { setupControls } from "./setup/setupControls"

export class App {
  constructor() {
    useGeographic()

    this.map = new Map({
      // Shift + click to rotate and zoom the map
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [-71.2292, 46.8379],
        zoom: 8
      })
    })

    setupDragAndDrop(this.map)
    setupUploadHandler(this.map)
    setupPopup(this.map)
    setupControls(this.map)
  }
}
