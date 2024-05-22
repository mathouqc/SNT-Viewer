/**
 * Update the layer list in the layer menu when a new Layer is added to the map
 * @param {Map} map
 */
export function setupLayerControl(map) {
  map.on("add:layer", () => {
    updateList(map)
  })

  map.on("remove:layer", () => {
    updateList(map)
  })
}

/**
 * Update layer list
 * @param {Map} map
 */
export function updateList(map) {
  // Clear layer menu element
  const layersElem = document.getElementById("layers")
  layersElem.innerHTML = ""

  // Add elements to the layers element
  map
    .getLayers()
    .getArray()
    .filter((layer) => layer.dataType === "lines")
    .forEach((layer) => {
      const div = createListElem(layer)
      layersElem.appendChild(div)
    })

  // Add event listener to checkboxes
  document.querySelectorAll("#layers input[type='checkbox']").forEach((elem) => {
    // Update layer and overlays visibility on checkbox change
    elem.addEventListener("change", (event) => {
      const layerName = event.target.parentNode.getElementsByTagName("p")[0].textContent

      // Toggle overlays visibility
      map
        .getOverlays()
        .getArray()
        .filter((overlay) => overlay.dataType === "label")
        .forEach((overlay) => {
          if (overlay.filename === layerName) {
            overlay.setShow(!overlay.show)
          }
        })

      // Toggle layer visibility
      map
        .getLayers()
        .getArray()
        .filter((layer) => layer.dataType === "lines")
        .forEach((layer) => {
          if (layer.name === layerName) {
            layer.setVisible(!layer.isVisible())
          }
        })

      // Update layer menu after layer visiblity is changed
      updateList(map)
    })
  })

  function createListElem(layer) {
    const div = document.createElement("div")
    const label = document.createElement("label")
    const input = document.createElement("input")
    input.type = "checkbox"
    if (layer.isVisible()) {
      input.checked = true
    }
    label.appendChild(input)
    const p = document.createElement("p")
    p.textContent = layer.name
    label.appendChild(p)
    div.appendChild(label)
    return div
  }
}

let layersOpened = false

/**
 * Toggle the layers menu
 */
export function toggleLayers() {
  if (!layersOpened) {
    openLayers()
    layersOpened = true
  } else {
    closeLayers()
    layersOpened = false
  }
}

function openLayers() {
  layersOpened = true
  document.getElementById("layers-ctn").classList.add("opened")
}

function closeLayers() {
  layersOpened = false
  document.getElementById("layers-ctn").classList.remove("opened")
}
