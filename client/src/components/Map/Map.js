import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrLocation from "./markers/currLocation";
import { connect } from "react-redux";
import hash from "../../hash";
import { updateUser } from "../../actions/account";
import * as $ from "jquery";
import { Spinner } from "react-bootstrap";
class Map extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user_spotify_id: null,
      no_data: false,
      center: "",
      currLocation: false,
      loadComplete: false,
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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.currentCoords,
        this.handleLocationError
      );
    }
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getUserId(_token);
    }
  };

  getUserId(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // Checks if the data is not empty
        if (!data) {
          console.log("No data!");
          return;
        }

        this.setState({
          user_spotify_id: data.id,
        });

        const userData = {
          spotifyUserId: data.id,
        };
        const userId = localStorage.getItem("userId");
        this.props.updateUser(userId, userData);
      },
    });
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({
      center: { lat: latitude, lng: longitude },
      currLocation: true,
      loadComplete: true,
    });
  };

  handleLocationError = () => {
    this.setState({ loadComplete: true });
  };

  render() {
    const { center, currLocation, loadComplete } = this.state;
    const currLat = center.lat;
    const currLng = center.lng;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        {loadComplete ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={this.props.center}
            center={center ? center : this.props.center}
            defaultZoom={this.props.zoom}
          >
            {currLocation ? <CurrLocation lat={currLat} lng={currLng} /> : null}
          </GoogleMapReact>
        ) : (
          <Spinner
            animation="border"
            style={{ position: "fixed", top: "50%", left: "50%" }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account,
  };
};

const mapDispatchToProps = () => {
  return {
    updateUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Map);
