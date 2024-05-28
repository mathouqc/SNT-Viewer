import "../assets/style.scss";
import { MyMap } from "./lib/MyMap";
import { View } from "ol";
import { Tile as TileLayer } from "ol/layer.js";
import { OSM } from "ol/source.js";
import { useGeographic } from "ol/proj";
import { DragRotateAndZoom, defaults as defaultInteractions } from "ol/interaction.js";
import { setupDragAndDrop } from "./setup/setupDragAndDrop";
import { setupUploadHandler } from "./setup/setupUploadHandler";
import { setupPopup } from "./setup/setupPopup";
import { setupControls } from "./setup/setupControls";
import { setupSettings } from "./setup/setupSettings";
import { setupLayerControl } from "./setup/setupLayerControl";

export class App {
  constructor() {
    useGeographic();

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    this.map = new MyMap({
      // Shift + click to rotate and zoom the map
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      target: "map",
      layers: [baseLayer],
      view: new View({
        center: [-71.2292, 46.8379],
        zoom: 8,
      }),
    });

    this.map.appVersion = "v1.0.2";
    this.map.baseLayer = baseLayer;

    setupDragAndDrop(this.map);
    setupUploadHandler(this.map);
    setupPopup(this.map);
    setupControls(this.map);
    setupSettings(this.map);
    setupLayerControl(this.map);
  }
}
