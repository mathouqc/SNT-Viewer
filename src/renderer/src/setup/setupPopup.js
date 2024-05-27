import Select from "ol/interaction/Select";
import { singleClick } from "ol/events/condition";
import PopupFeature from "ol-ext/overlay/PopupFeature";

/**
 * Function to add popups when users click on features.
 * @param {Map} map
 */
export function setupPopup(map) {
  const select = new Select({
    hitTolerance: 2,
    condition: singleClick,
    layers: (layer) => layer.dataType === "lines",
  });

  map.addInteraction(select);

  const popupOverlay = new PopupFeature({
    select: select,
  });

  map.addOverlay(popupOverlay);
}
