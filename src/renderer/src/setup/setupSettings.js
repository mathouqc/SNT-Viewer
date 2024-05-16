import { toggleSettings } from "../settings/handleSettings"
import { Style, Stroke } from "ol/style"

export function setupSettings(map) {
  // Toggle settings
  const settingsBtn = document.getElementsByClassName("settings-btn")
  for (const element of settingsBtn) {
    element.addEventListener("click", () => {
      toggleSettings()
    })
  }

  // Opacity slider
  const opacityInput = document.getElementById("opacity-input")
  opacityInput.addEventListener("input", () => {
    updateOpacity()
  })

  function updateOpacity() {
    const opacity = parseFloat(opacityInput.value)
    map.baseLayer.setOpacity(opacity)
  }

  // Line size slider
  const linesizeInput = document.getElementById("linesize-input")
  linesizeInput.addEventListener("input", () => {
    updateLinesize()
  })

  function updateLinesize() {
    const linesLayers = map
      .getLayers()
      .getArray()
      .filter((layer) => layer.get("dataType") === "lines")
    for (const layer of linesLayers) {
      layer.setStyle((feature) => {
        return new Style({
          stroke: new Stroke({
            color: feature.get("status") === "Acquis" ? "#2abf1d" : "#000bd9",
            width: linesizeInput.value
          })
        })
      })
    }
  }

  // Font size slider
  const fontsizeInput = document.getElementById("fontsize-input")
  fontsizeInput.addEventListener("input", () => {
    updateFontsize()
  })

  function updateFontsize() {
    for (const overlay of map.getOverlays().getArray()) {
      for (const childElem of overlay.element.children) {
        childElem.style.fontSize = fontsizeInput.value + "px"
      }
    }
  }
}
