import React, { Component } from 'react';
import { geoQueries } from './config';
const AppContext = React.createContext();

export class Provider extends Component {
  onXYupdate = (x, y) => {
    this.setState({ x, y });
  };
  state = {
    x: -76.6,
    y: 39.3,
    liquorLicenses: [],
    callsForService: [],
    error: '',
    onXYupdate: this.onXYupdate
  };
  componentDidMount() {
    geoQueries.forEach(async item => {
      const response = await fetch(item.url);
      const data = await response.json();
      this.setState({
        [item.name]: data.features
      });
    });
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;
