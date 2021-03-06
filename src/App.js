import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { geoQueries } from './config';
import Geocoder from './components/Geocoder/Geocoder';
import TopMenu from './components/TopMenu';
import LocationTracker from './components/LocationTracker';
import EsriMap from './components/EsriMap';
import Inspections from './components/Inspections/Inspections';

class App extends Component {
  state = {
    mapCenter: {
      x: -76.6,
      y: 39.3
    },
    layers: {},
    error: null
  };
  componentDidMount() {
    geoQueries.forEach(async item => {
      try {
        const response = await fetch(item.url);
        const data = await response.json();
        this.setState(prevState => ({
          layers: {
            ...prevState.layers,
            [item.name]: {
              ...item,
              features: data.features.filter(item => item.geometry)
            }
          }
        }));
      } catch (error) {
        this.setState({ error });
      }
    });
  }
  onXYupdate = (x, y) => {
    this.setState({ mapCenter: { x, y } });
  };
  render() {
    const { mapCenter, layers } = this.state;
    return (
      <div>
        <LocationTracker updateXY={this.onXYupdate} />
        <TopMenu />
        <Container style={{ marginTop: '6em' }}>
          <Geocoder updateXY={this.onXYupdate} />
          <EsriMap center={mapCenter} updateXY={this.onXYupdate} />
          <Inspections center={mapCenter} layers={layers} />
        </Container>
      </div>
    );
  }
}

export default App;
