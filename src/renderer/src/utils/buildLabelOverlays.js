import { Overlay } from "ol"

/**
 * Create overlays for each label point and add them to the map
 * @param {Map} map
 * @param {VectorSource} labelSource - Point features containing position and rotation for the overlays
 */
export function buildLabelOverlays(map, labelSource) {
  for (const feature of labelSource.getFeatures()) {
    const { no_ligne, rotation } = feature.getProperties()

    const elem = document.createElement("div")
    if (document.getElementById("fontsize-input")) {
      elem.style.fontSize = document.getElementById("fontsize-input").value + "px"
    }
    elem.classList.add("label")
    elem.style.transform = `rotate(${rotation}rad)`
    elem.innerHTML = `${no_ligne}`

    const label = new Overlay({
      position: feature.getGeometry().getCoordinates(),
      positioning: "center-center",
      element: elem,
      stopEvent: false
    })

    // Custom properties and function
    label.dataType = "label"
    label.filename = labelSource.name

    label.show = true
    label.setShow = (bool) => {
      label.show = bool
      const elem = label.getElement()
      elem.style.display = bool ? "flex" : "none"
      label.setElement(elem)
    }

    map.addOverlay(label)
  }
}
