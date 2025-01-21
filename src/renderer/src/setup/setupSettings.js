import { createLineStyleFunction } from "../utils/buildLineLayer";

/**
 * Function to handle the settings menu.
 * @param {Map} map
 */
export function setupSettings(map) {
  // Opacity slider
  const opacityInput = document.getElementById("opacity-input");
  opacityInput.addEventListener("input", () => {
    map.mySettings.baseLayerOpacity = parseFloat(opacityInput.value);
    updateSettings(map);
  });

  // Line size slider
  const linesizeInput = document.getElementById("linesize-input");
  linesizeInput.addEventListener("input", () => {
    map.mySettings.lineSize = linesizeInput.value;
    updateSettings(map);
  });

  // Font size slider
  const fontsizeInput = document.getElementById("fontsize-input");
  fontsizeInput.addEventListener("input", () => {
    map.mySettings.fontSize = fontsizeInput.value;
    updateSettings(map);
  });

  //Show flown checkbox
  const flownInput = document.getElementById("flown-input");
  flownInput.addEventListener("change", () => {
    map.mySettings.showFlown = flownInput.checked;
    updateSettings(map);
  });

  // Default settings
  map.mySettings = {
    baseLayerOpacity: opacityInput ? parseFloat(opacityInput) : 1,
    lineSize: linesizeInput ? linesizeInput.value : 3,
    fontSize: fontsizeInput ? fontsizeInput.value : 16,
    showFlown: flownInput ? flownInput.checked : true,
  };
}

/**
 * Update settings of the map
 * @param {Map} map
 */
export function updateSettings(map) {
  // Update opacity
  map.baseLayer.setOpacity(map.mySettings.baseLayerOpacity);
  map.airportLayer.setOpacity(map.mySettings.baseLayerOpacity);
  // Update lineSize and showFlown
  const linesLayers = map
    .getLayers()
    .getArray()
    .filter((layer) => layer.dataType === "lines");

  for (const layer of linesLayers) {
    layer.setStyle(createLineStyleFunction(map.mySettings.showFlown, map.mySettings.lineSize));
  }
  // Update fontSize
  for (const overlay of map.getOverlays().getArray()) {
    for (const childElem of overlay.element.children) {
      childElem.style.fontSize = map.mySettings.fontSize + "px";
    }
    // Update showFlown
    if (overlay.layerActive) {
      if (overlay.status === "Acquis" && !map.mySettings.showFlown) {
        overlay.setShow(false);
      } else {
        overlay.setShow(true);
      }
    }
  }
}

let settingsOpened = false;

/**
 * Toggle the setings menu
 */
export function toggleSettings() {
  if (!settingsOpened) {
    openSettings();
    settingsOpened = true;
  } else {
    closeSettings();
    settingsOpened = false;
  }
}

function openSettings() {
  settingsOpened = true;
  document.getElementById("settings-ctn").classList.add("opened");
}

function closeSettings() {
  settingsOpened = false;
  document.getElementById("settings-ctn").classList.remove("opened");
}
