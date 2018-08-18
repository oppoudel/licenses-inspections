import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { Provider, Consumer } from './AppContext';
import Geocoder from './components/Geocoder/Geocoder';
import TopMenu from './components/TopMenu';
import LocationTracker from './components/LocationTracker';
import EsriMap from './components/EsriMap';
import Inspections from './components/Inspections';

class App extends Component {
  render() {
    return (
      <Provider>
        <div>
          <Consumer>
            {({ onXYupdate }) => <LocationTracker updateXY={onXYupdate} />}
          </Consumer>
          <TopMenu />
          <Container style={{ marginTop: '5em' }}>
            <Consumer>
              {({ x, y, onXYupdate, liquorLicenses, callsForService }) => (
                <Fragment>
                  <Geocoder updateXY={onXYupdate} />
                  <EsriMap x={x} y={y} />
                  <Inspections
                    x={x}
                    y={y}
                    liquorLicenses={liquorLicenses}
                    callsForService={callsForService}
                  />
                </Fragment>
              )}
            </Consumer>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
