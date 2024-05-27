import { App } from "./src/main";

window.onload = () => {
  new App();

  // Hide download button if on electron
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf(" electron/") > -1) {
    document.getElementById("settings-download").remove();
  }
};
