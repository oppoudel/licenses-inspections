import { loadModules } from "esri-loader";
import React, { Component } from "react";
import { Card, Segment, Header } from "semantic-ui-react";
import isEqual from "react-fast-compare";

const styles = {
  mapDiv: {
    height: "400px",
    width: "100",
    position: "relative"
  }
};
let webmap, view;
const options = {
  url: "https://js.arcgis.com/4.8/",
  dojoConfig: {
    has: {
      "esri-featurelayer-webgl": 1
    }
  }
};

export default class EsriMap extends Component {
  viewdivRef = React.createRef();
  componentDidMount = () => {
    this.createMap();
  };
  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.addPoint();
    }
  }

  addPoint = () => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/geometryEngine"
      ],
      options
    ).then(([Graphic, GraphicsLayer, geometryEngine]) => {
      const {
        center: { x, y }
      } = this.props;
      if (webmap && view) {
        webmap.removeAll();
        view.graphics.removeAll();
        const marker = {
          type: "simple-marker",
          style: "circle",
          size: 12,
          color: [51, 176, 255],
          outline: {
            color: [0, 0, 0],
            width: 1
          }
        };
        const pointGraphic = new Graphic({
          geometry: {
            type: "point",
            x,
            y
          },
          symbol: marker
        });
        const pointBuffer = geometryEngine.geodesicBuffer(
          pointGraphic.geometry,
          200,
          "feet",
          true
        );
        const bufferGraphic = new Graphic({
          geometry: pointBuffer,
          symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            outline: {
              width: 1.5,
              color: [0, 0, 0, 0.5]
            },
            style: "none"
          }
        });
        view.graphics.addMany([bufferGraphic, pointGraphic]);
        view.goTo([x, y]);
      }
    });
  };
  createMap() {
    const {
      center: { x, y },
      updateXY
    } = this.props;
    loadModules(["esri/views/MapView", "esri/Map"]).then(
      ([MapView, Map, Graphic, GraphicsLayer], options) => {
        webmap = new Map({
          basemap: "streets-navigation-vector"
        });
        view = new MapView({
          map: webmap,
          container: this.viewdivRef.current,
          zoom: 16,
          center: [x, y]
        });
        // prevents panning with the mouse drag event
        view.on("drag", e => e.stopPropagation());

        view.when(() => this.addPoint());
        view.on("click", e =>
          updateXY(e.mapPoint.longitude, e.mapPoint.latitude)
        );
      }
    );
  }

  render() {
    return (
      <Segment>
        <Card fluid>
          <div style={styles.mapDiv} ref={this.viewdivRef} />
        </Card>
        <Header as="h5">Search Distance : 200ft</Header>
      </Segment>
    );
  }
}
