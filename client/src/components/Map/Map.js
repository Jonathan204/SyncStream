import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrLocation from "./markers/currLocation";
import OthersLocation from "./markers/othersLocation";
import { connect } from "react-redux";
import hash from "../../hash";
import { updateUser } from "../../actions/account";
import { getUsers } from "../../actions/users";
import * as $ from "jquery";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

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
      users: null,
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

  async getUserId(token) {
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
          lat: this.state.center.lat,
          lng: this.state.center.lng
        };
        const userId = localStorage.getItem("userId");
        this.props.updateUser(userId, userData);
      },
    });
  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.props.getUsers();
    this.setState({
      center: { lat: latitude, lng: longitude },
      currLocation: true,
      loadComplete: true,
      users: this.props.users,
    });
  };

  handleLocationError = () => {
    this.setState({ loadComplete: true });
  };

  render() {
    const { center, loadComplete, users } = this.state;

    const currUserId = this.props.user.id;
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
        
            {users.map((user) => {
              if(user._id === currUserId){
                return <CurrLocation key={user._id} lat={user.lat} lng={user.lng} isUser={true} />
              }else {
                if(user.lat && user.lng){
                  return <OthersLocation key={user._id} lat={user.lat} lng={user.lng} isUser={false}/>
                }
              }
              return null;
            })}
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  updateUser: (id, user) => {
    dispatch(updateUser(id, user));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Map)
);
