import "../assets/style.scss";
import { MyMap } from "./lib/MyMap";
import { View } from "ol";
import { OSM } from "ol/source.js";
import { Tile as TileLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import { DragRotateAndZoom, defaults as defaultInteractions } from "ol/interaction.js";
import { buildAirportLayer } from "./utils/buildAirportLayer";
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

    const airportLayer = buildAirportLayer();

    this.map = new MyMap({
      // Shift + click to rotate and zoom the map
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      target: "map",
      layers: [baseLayer, airportLayer],
      view: new View({
        center: [-71.2292, 46.8379],
        zoom: 8,
      }),
    });

    this.map.appVersion = "v1.1.0";
    this.map.baseLayer = baseLayer;
    this.map.airportLayer = airportLayer;

    setupDragAndDrop(this.map);
    setupUploadHandler(this.map);
    setupPopup(this.map);
    setupControls(this.map);
    setupSettings(this.map);
    setupLayerControl(this.map);
  }
}
