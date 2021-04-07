import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerLocation from "./MarkerLocation/MarkerLocation";
import { connect } from "react-redux";
import { authorize } from "../../hash";
import { getTokens, getUserId } from "../../utils/spotifyUtils";
import { updateUser, updateSpotifyInfo } from "../../actions/account";
import { getUsers } from "../../actions/users";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import map from "./mapStyles";

export class Map extends Component {
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
    this.props.getUsers();
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
      profilePic: data.images[0].url,
    };

    const userId = localStorage.getItem("userId");
    this.props.updateUser(userId, userData);
  }

  currentCoords = (position) => {
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    this.setState({
      center,
      currLocation: true,
      loadComplete: true,
    });
    this.props.updateUser(this.props.user.id, center);
  };

  handleLocationError = () => {
    this.setState({ loadComplete: true });
  };

  inRange = (coord, target, key) => {
    const range = 0.0007;
    const targetF = parseFloat(target);
    var newCoor = parseFloat(coord);
    if (newCoor > targetF - range && newCoor < targetF + range) {
      newCoor += range * 2;
      var center = {};
      center[key] = newCoor;
      this.props.updateUser(this.props.user.id, center);
    }
    return newCoor.toString();
  };

  render() {
    const { center, loadComplete } = this.state;
    const { users } = this.props;
    const { username, spotifyUserId, profilePic } = this.props.user;

    let userList;
    if (users) {
      userList = users.map((user) => {
        if (user.username !== username && user.lat && user.lng) {
          const theLat = this.inRange(user.lat, this.props.user.lat, "lat");
          const theLng = this.inRange(user.lng, this.props.user.lng, "lng");
          return (
            <MarkerLocation
              name={user.username}
              key={user.username}
              userName={user.spotifyUserId}
              lat={theLat}
              lng={theLng}
              isUser={false}
              profilePic={user.profilePic}
            />
          );
        }
        return null;
      });
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        {loadComplete ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={this.props.center}
            center={center ? center : this.props.center}
            defaultZoom={this.props.zoom}
            options={{ styles: map }}
          >
            {userList}
            {center && (
              <MarkerLocation
                name={username}
                key={username}
                userName={spotifyUserId}
                lat={center.lat}
                lng={center.lng}
                isUser={true}
                profilePic={profilePic}
              />
            )}
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
    dispatch(updateSpotifyInfo(id, authData));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
