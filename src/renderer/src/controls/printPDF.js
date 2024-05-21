import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

/**
 * Generate a pdf from a screenshot of the map without the controls
 */
export function printPDF() {
  hideControls()
  html2canvas(document.getElementById("map")).then((canvas) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    })
    pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, canvas.width, canvas.height)
    pdf.save("map.pdf")
  })
  showControls()
}

function hideControls() {
  const elements = [
    ...document.getElementsByClassName("ol-zoom"),
    ...document.getElementsByClassName("print-btn"),
    ...document.getElementsByClassName("clear-btn"),
    ...document.getElementsByClassName("layers-btn"),
    ...document.getElementsByClassName("settings-btn"),
    ...document.getElementsByClassName("extend-btn"),
    ...document.getElementsByClassName("upload-btn")
  ]
  elements.forEach((element) => {
    element.style.display = "none"
  })
}

function showControls() {
  const elements = [
    ...document.getElementsByClassName("ol-zoom"),
    ...document.getElementsByClassName("print-btn"),
    ...document.getElementsByClassName("clear-btn"),
    ...document.getElementsByClassName("layers-btn"),
    ...document.getElementsByClassName("settings-btn"),
    ...document.getElementsByClassName("extend-btn"),
    ...document.getElementsByClassName("upload-btn")
  ]
  elements.forEach((element) => {
    element.style.display = "block"
  })
}
