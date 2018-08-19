import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { geoQueries } from './config';
import Geocoder from './components/Geocoder/Geocoder';
import TopMenu from './components/TopMenu';
import LocationTracker from './components/LocationTracker';
import EsriMap from './components/EsriMap';
import Inspections from './components/Inspections';

class App extends Component {
  state = {
    x: -76.6,
    y: 39.3,
    liquorLicenses: [],
    callsForService: [],
    error: null,
    onXYupdate: this.onXYupdate
  };
  componentDidMount() {
    geoQueries.forEach(async item => {
      try {
        const response = await fetch(item.url);
        const data = await response.json();
        this.setState({
          [item.name]: data.features.filter(item => item.geometry)
        });
      } catch (error) {
        this.setState({ error });
      }
    });
  }
  onXYupdate = (x, y) => {
    this.setState({ x, y });
  };
  render() {
    const { x, y, liquorLicenses, callsForService } = this.state;
    return (
      <div>
        <LocationTracker updateXY={this.onXYupdate} />
        <TopMenu />
        <Container style={{ marginTop: '5em' }}>
          <Geocoder updateXY={this.onXYupdate} />
          <EsriMap x={x} y={y} />
          <Inspections
            x={x}
            y={y}
            liquorLicenses={liquorLicenses}
            callsForService={callsForService}
          />
        </Container>
      </div>
    );
  }
}

export default App;
