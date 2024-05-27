import { createLineStyleFunction } from "../utils/buildVectorLayer"

/**
 * Function to handle the settings menu.
 * @param {Map} map
 */
export function setupSettings(map) {
  // Opacity slider
  const opacityInput = document.getElementById("opacity-input")
  opacityInput.addEventListener("input", () => {
    const opacity = parseFloat(opacityInput.value)
    map.baseLayer.setOpacity(opacity)
  })

  // Line size slider
  const linesizeInput = document.getElementById("linesize-input")
  linesizeInput.addEventListener("input", () => {
    updateLinesize()
  })

  function updateLinesize() {
    const linesLayers = map
      .getLayers()
      .getArray()
      .filter((layer) => layer.dataType === "lines")

    for (const layer of linesLayers) {
      layer.setStyle(createLineStyleFunction(linesizeInput.value))
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

let settingsOpened = false

/**
 * Toggle the setings menu
 */
export function toggleSettings() {
  if (!settingsOpened) {
    openSettings()
    settingsOpened = true
  } else {
    closeSettings()
    settingsOpened = false
  }
}

function openSettings() {
  settingsOpened = true
  document.getElementById("settings-ctn").classList.add("opened")
}

function closeSettings() {
  settingsOpened = false
  document.getElementById("settings-ctn").classList.remove("opened")
}
