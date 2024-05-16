let settingsOpened = false

export function openSettings() {
  settingsOpened = true
  document.getElementById("settings-ctn").classList.add("opened")
}

export function closeSettings() {
  settingsOpened = false
  document.getElementById("settings-ctn").classList.remove("opened")
}

export function toggleSettings() {
  if (!settingsOpened) {
    openSettings()
    settingsOpened = true
  } else {
    closeSettings()
    settingsOpened = false
  }
}
