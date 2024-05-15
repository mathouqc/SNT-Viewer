import Button from "ol-ext/control/Button"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export function setupControls(map) {
  const save = new Button({
    html: '<i class="fa fa-print"></i>',
    className: "print-btn",
    title: "Print",
    handleClick: () => {
      printPDF(map)
    }
  })

  map.addControl(save)

  const upload = new Button({
    html: '<i class="fa fa-upload"></i>',
    className: "upload-btn",
    title: "Upload",
    handleClick: () => {
      uploadSNT(map)
    }
  })

  map.addControl(upload)
}

function hideControls() {
  const elements = [
    ...document.getElementsByClassName("ol-zoom"),
    ...document.getElementsByClassName("print-btn"),
    ...document.getElementsByClassName("upload-btn")
  ]
  console.log(elements)
  elements.forEach((element) => {
    element.style.display = "none"
  })
}

function showControls() {
  const elements = [
    ...document.getElementsByClassName("ol-zoom"),
    ...document.getElementsByClassName("print-btn"),
    ...document.getElementsByClassName("upload-btn")
  ]
  elements.forEach((element) => {
    element.style.display = "block"
  })
}

function printPDF() {
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

function uploadSNT(map) {
  console.log("Upload", map)
}
