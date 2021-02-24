import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrLocation from "./markers/currLocation";
import { useDispatch, useSelector } from "react-redux";
import hash from "../../hash";
import { updateUser, getUser } from "../../actions/account";
import * as $ from "jquery";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user_id: null,
      no_data: false,
      center: "",
      currLocation: false,
    };

    this.getUserId = this.getUserId.bind(this);
  }
  
  static defaultProps = {
    center: {
      lat: 49.895138,
      lng: -97.138374,
    },
    zoom: 16,
  };

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(this.currentCoords);

  };

  getUserId(token){

    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          console.log("No data!");
          return;
        }

        this.updateUser(data.id);
      }
    });
  }

  updateUser(id){
    const dispatch = useDispatch();
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({
      center: { lat: latitude, lng: longitude },
      currLocation: true,
    });
  };

  render() {
    const { center, currLocation } = this.state;
    const currLat = center.lat;
    const currLng = center.lng;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          center={center ? center : this.props.center}
          defaultZoom={this.props.zoom}
        >
          {currLocation ? <CurrLocation lat={currLat} lng={currLng} /> : null}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
