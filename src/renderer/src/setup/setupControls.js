/**
 * Function to add controls (upload and print buttons) to the map.
 */

import Button from "ol-ext/control/Button"
import { printPDF } from "../utils/printPDF"

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

  const print = new Button({
    html: '<i class="fa fa-print"></i>',
    className: "print-btn", // Defined in style.scss
    title: "Print",
    handleClick: () => {
      printPDF(map)
    }
  })

  map.addControl(print)
}
