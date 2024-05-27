import { Map } from "ol";
import BaseEvent from "ol/events/Event";

/** Emit an event when a layer is added or removed */
export class MyMap extends Map {
  addLayer(layer) {
    super.addLayer(layer);
    super.dispatchEvent(new BaseEvent("add:layer"));
  }

  removeLayer(layer) {
    super.removeLayer(layer);
    super.dispatchEvent(new BaseEvent("remove:layer"));
  }
}
