/**
 * Function to add popups when users click on features.
 */

import Select from "ol/interaction/Select"
import { singleClick } from "ol/events/condition"
import PopupFeature from "ol-ext/overlay/PopupFeature"

export function setupPopup(map) {
  const select = new Select({
    hitTolerance: 2,
    condition: singleClick
  })

  map.addInteraction(select)

  const popupOverlay = new PopupFeature({
    select: select
  })

  map.addOverlay(popupOverlay)
}
