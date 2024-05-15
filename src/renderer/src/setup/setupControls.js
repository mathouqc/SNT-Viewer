import Button from "ol-ext/control/Button"
import { clearMap } from "../utils/clearMap"
import { printPDF } from "../utils/printPDF"

/**
 * Function to add controls (upload and print buttons) to the map.
 * @param {Map} map
 */
export function setupControls(map) {
  const upload = new Button({
    html: '<i class="fa fa-upload"></i>',
    className: "upload-btn", // Defined in style.scss
    title: "Upload",
    handleClick: () => {
      document.getElementById("file-upload").click()
    }
  })

  map.addControl(upload)

  const clear = new Button({
    html: '<i class="fa fa-trash"></i>',
    className: "clear-btn", // Defined in style.scss
    title: "Clear",
    handleClick: () => {
      clearMap(map)
    }
  })

  map.addControl(clear)

  const print = new Button({
    html: '<i class="fa fa-print"></i>',
    className: "print-btn", // Defined in style.scss
    title: "Print",
    handleClick: () => {
      printPDF()
    }
  })

  map.addControl(print)
}
