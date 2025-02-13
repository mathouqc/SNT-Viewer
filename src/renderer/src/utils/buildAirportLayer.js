import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON.js";
import { Style } from "ol/style";
import { Text } from "ol/style";
import { Icon } from "ol/style";

import airportsURL from "../../assets/geojson/airports.geojson?url";
import planeIcon from "../../assets/plane.png?url";

export function buildAirportLayer() {
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      url: airportsURL,
      format: new GeoJSON(),
    }),
    style: (feature) => {
      return new Style({
        text: new Text({
          text: feature.get("Id"),
          font: "bold 14px Helvetica",
          offsetY: -12,
        }),
        image: new Icon({
          src: planeIcon,
          scale: 0.17,
        }),
      });
    },
  });

  vectorLayer.dataType = "airports";
  vectorLayer.name = "Airports";

  return vectorLayer;
}
