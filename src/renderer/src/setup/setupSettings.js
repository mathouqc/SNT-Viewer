import { toggleSettings } from "../settings/handleSettings"

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
    update()
  })

  function update() {
    const opacity = parseFloat(opacityInput.value)
    map.baseLayer.setOpacity(opacity)
  }
}
