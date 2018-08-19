import { Component } from 'react';
const options = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0
};

export default class LocationTracker extends Component {
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      pos => this.props.updateXY(pos.coords.longitude, pos.coords.latitude),
      err => console.warn(err.message),
      options
    );
  }
  render() {
    return null;
  }
}
