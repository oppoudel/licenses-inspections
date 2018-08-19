import { loadModules } from 'esri-loader';
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import isEqual from 'react-fast-compare';

const styles = {
  mapDiv: {
    height: '300px',
    width: '100',
    position: 'relative'
  }
};
let webmap, view;
const options = {
  url: 'https://js.arcgis.com/4.8/',
  dojoConfig: {
    has: {
      'esri-featurelayer-webgl': 1
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
    loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer'], options).then(
      ([Graphic, GraphicsLayer]) => {
        const { x, y } = this.props;
        if (webmap && view) {
          webmap.removeAll();
          const point = {
            type: 'point',
            x,
            y
          };
          const marker = {
            type: 'simple-marker',
            color: [0, 123, 255]
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: marker
          });
          const layer = new GraphicsLayer({
            graphics: [pointGraphic]
          });
          webmap.add(layer);
          view.goTo([x, y]);
        }
      }
    );
  };
  createMap() {
    const { x, y } = this.props;
    loadModules(['esri/views/MapView', 'esri/Map']).then(
      ([MapView, Map, Graphic, GraphicsLayer], options) => {
        webmap = new Map({
          basemap: 'topo-vector'
        });
        view = new MapView({
          map: webmap,
          container: this.viewdivRef.current,
          zoom: 17,
          center: [x, y]
        });
        // prevents panning with the mouse drag event
        view.on('drag', e => e.stopPropagation());
        view.when(() => this.addPoint());
      }
    );
  }

  render() {
    return (
      <Card fluid>
        <div style={styles.mapDiv} ref={this.viewdivRef} />
      </Card>
    );
  }
}
