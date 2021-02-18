import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CurrLocation from './markers/currLocation';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 49.895138,
      lng: -97.138374
    },
    zoom: 16
  };
  state = {
    center: "",
    currLocation: false,
  }
  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition(this.currentCoords)
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState({
      center: { lat: latitude, lng: longitude },
      currLocation: true,
    })
  }

  render() {
    const currLat = this.state.center.lat;
    const currLng = this.state.center.lng;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.currLocation ? <CurrLocation lat={currLat} lng={currLng} /> : null}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
