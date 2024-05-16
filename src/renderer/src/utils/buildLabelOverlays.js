import { Overlay } from "ol"

export function buildLabelOverlays(map, labelSource) {
  for (const feature of labelSource.getFeatures()) {
    const { no_ligne, rotation } = feature.getProperties()

    const elem = document.createElement("div")
    elem.classList.add("label")
    elem.style.transform = `rotate(${rotation}rad)`
    elem.innerHTML = `${no_ligne}`

    const label = new Overlay({
      position: feature.getGeometry().getCoordinates(),
      positioning: "center-center",
      element: elem,
      stopEvent: false
    })
    label.dataType = "label"

    map.addOverlay(label)
  }
}
