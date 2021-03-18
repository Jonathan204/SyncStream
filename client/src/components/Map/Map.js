import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerLocation from "./markers/markerLocation";
import { connect } from "react-redux";
import { authorize } from "../../hash";
import { getTokens, getUserId } from "../../utils/spotifyUtils";
import { updateUser } from "../../actions/account";
import { getUsers } from "../../actions/users";
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

    this.saveUserId = this.saveUserId.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 49.895138,
      lng: -97.138374,
    },
    zoom: 16,
  };

  componentDidMount = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.currentCoords,
        this.handleLocationError
      );
    }

    const { spotifyAccess, spotifyUserId, id } = this.props.user;
    if (spotifyAccess) {
      this.setState({
        token: spotifyAccess,
      });
      if (!spotifyUserId) await this.saveUserId(spotifyAccess);
    } else {
      const code = authorize();
      if (code) {
        try {
          const authData = await getTokens(code);
          await this.props.updateSpotifyInfo(id, authData);
          await this.saveUserId(authData.spotifyAccess);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  async saveUserId(token) {
    const data = await getUserId(token);
    this.setState({
      user_spotify_id: data.id,
    });
    const userData = {
      spotifyUserId: data.id,
      lat: this.state.center.lat,
      lng: this.state.center.lng,
    };
    const userId = localStorage.getItem("userId");
    this.props.updateUser(userId, userData);
  }

  currentCoords = (position) => {
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    this.props.getUsers();
    this.setState({
      center,
      currLocation: true,
      loadComplete: true,
      users: this.props.users,
    });
    this.props.updateUser(this.props.user.id, center);
  };

  handleLocationError = () => {
    this.setState({ loadComplete: true });
  };

  render() {
    const { center, loadComplete, users } = this.state;
    const currUsername = this.props.user.username;
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
              if (user.username === currUsername) {
                return (
                  <MarkerLocation
                    key={user.username}
                    lat={user.lat}
                    lng={user.lng}
                    isUser={true}
                  />
                );
              } else {
                if (user.lat && user.lng) {
                  var theLat = parseFloat(user.lat);
                  if(user.lat === this.props.user.lat){
                    theLat = (theLat+.0005).toString();
                    
                  }
                  return (
                    <MarkerLocation
                      key={user.username}
                      lat={theLat}
                      lng={user.lng}
                      isUser={false}
                    />
                  );
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
  updateSpotifyInfo: (id, authData) => {
    dispatch(updateUser(id, authData));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
