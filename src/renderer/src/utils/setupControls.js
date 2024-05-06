import Button from "ol-ext/control/Button"

export function setupControls(map) {
  const save = new Button({
    html: '<i class="fa fa-print"></i>',
    className: "print-btn",
    title: "Print",
    handleClick: () => {
      console.log("PRINT")
    }
  })

  map.addControl(save)
}
