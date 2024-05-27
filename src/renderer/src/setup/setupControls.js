import Button from "ol-ext/control/Button";
import { zoomExtend } from "../controls/zoomExtend";
import { toggleSettings } from "../setup/setupSettings";
import { clearMap } from "../controls/clearMap";
import { printPDF } from "../controls/printPDF";
import { toggleLayers } from "../setup/setupLayerControl";

/**
 * Function to add controls to the map.
 * @param {Map} map
 */
export function setupControls(map) {
  const extend = new Button({
    html: "E",
    className: "extend-btn", // Defined in style.scss
    title: "Zoom extend",
    handleClick: () => {
      zoomExtend(map);
    },
  });

  map.addControl(extend);

  const upload = new Button({
    html: '<i class="fa fa-upload"></i>',
    className: "upload-btn", // Defined in style.scss
    title: "Upload",
    handleClick: () => {
      document.getElementById("file-upload").click();
    },
  });

  map.addControl(upload);

  const settings = new Button({
    html: '<i class="fa fa-gear"></i>',
    className: "settings-btn", // Defined in style.scss
    title: "Settings",
    handleClick: () => {
      toggleSettings();
    },
  });

  map.addControl(settings);

  const clear = new Button({
    html: '<i class="fa fa-trash"></i>',
    className: "clear-btn", // Defined in style.scss
    title: "Clear",
    handleClick: () => {
      clearMap(map);
    },
  });

  map.addControl(clear);

  const print = new Button({
    html: '<i class="fa fa-print"></i>',
    className: "print-btn", // Defined in style.scss
    title: "Print",
    handleClick: () => {
      printPDF();
    },
  });

  map.addControl(print);

  const layers = new Button({
    html: '<i class="fa fa-layer-group"></i>',
    className: "layers-btn", // Defined in style.scss
    title: "Layers",
    handleClick: () => {
      toggleLayers();
    },
  });

  map.addControl(layers);
}
