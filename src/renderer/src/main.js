import "../assets/style.scss"
import { Map, View } from "ol"
import { Tile as TileLayer } from "ol/layer.js"
import { OSM } from "ol/source.js"
import { useGeographic } from "ol/proj"
import { setupDragAndDrop } from "./utils/setupDragAndDrop"
import { setupPopup } from "./utils/setupPopup"
import { setupControls } from "./utils/setupControls"

export class App {
  constructor() {
    useGeographic()

    this.map = new Map({
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
    setupPopup(this.map)
    setupControls(this.map)
  }
}
