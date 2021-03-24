import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import {
  authorizationUrl,
  getCurrentlyPlaying,
} from "../../../utils/spotifyUtils";
import { updateUser, refreshSpotify } from "../../../actions/account";
import { getUsersSpotify } from "../../../actions/users";

import Player from "../../Player/Player";
class InfoWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      is_ad: false,
      progress_ms: 0,
      no_data: false,
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    if (this.props.isUser) {
      let _token = this.props.user.spotifyAccess;
      if (_token) {
        this.setState({ token: _token });
        this.getSong(_token);
      }
    } else this.getSong(null);

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    this.getSong(this.state.token);
  }

  getSongInfo(data) {
    var newState = {};
    if (!data || (this.props.isUser && !data.currently_playing_type)) {
      newState = {
        no_data: true,
      };
    } else {
      if (!this.props.isUser || data.currently_playing_type === "track") {
        newState = {
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          is_ad: false,
          no_data: false /* We need to "reset" the boolean, in case the
                                user does not give F5 and has opened his Spotify. */,
        };
      } else {
        newState = {
          is_ad: true,
          no_data: false,
        };
      }
    }
    return newState;
  }

  async getSong(token) {
    var data;
    try {
      if (this.props.isUser && token) {
        data = await getCurrentlyPlaying(token);
        data = this.getSongInfo(data);
        const songInfo = {
          ...data,
          lastPlayed: new Date(),
        };
        this.props.updateUser(this.props.user.id, { songInfo });
      } else {
        await this.props.getUsersSpotify(this.props.userId);
        this.props.users.map((user) => {
          if (user.spotifyUserId === this.props.userId) {
            data = this.getSongInfo(user.songInfo);
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.props.refreshSpotify(this.props.user.id);
        const newToken = this.props.user.spotifyAccess;
        if (newToken && newToken !== token) {
          this.setState({ token: newToken });
          this.getSong(newToken);
        }
      }
    }
    this.setState(data);
  }

  render() {
    var nothingPlaying = false;
    var time = "0:00";
    var minutes = "";
    var seconds = "";
    const { token,  progress_ms } = this.state;
    if ((token && !this.state.no_data) || (!token && this.state.item && progress_ms)) {
      minutes = Math.floor(progress_ms / 60000);
      seconds = ((progress_ms % 60000) / 1000).toFixed(0);
      time = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    } else {
      nothingPlaying = true;
    }
    return (
      <div
        className={
          this.props.render
            ? "info-window-style-map"
            : "info-window-style-profile"
        }
      >
        <Container>
          <Row className="text-center">
            {!this.state.token && this.props.isUser && (
              <a
                className="spotify-btn spotify-btn--loginApp-link"
                href={authorizationUrl}
              >
                Login to Spotify
              </a>
            )}
            {!nothingPlaying && this.state.item.uri && (
              <div>
                <Player
                  item={this.state.item}
                  is_playing={this.state.is_playing}
                  progress_ms={this.state.progress_ms}
                  is_ad={this.state.is_ad}
                  is_me={this.props.isUser}
                  songTime={time}
                  songUri={this.props.isUser ? null : this.state.item.uri}
                />
              </div>
            )}
            {nothingPlaying && (
              <p>
                {this.props.isUser
                  ? "You need to be playing a song on Spotify, for something to appear here."
                  : "User isn't playing anything currently"}
              </p>
            )}
          </Row>
        </Container>
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

const mapDispatchToProps = () => {
  return {
    updateUser,
    getUsersSpotify,
    refreshSpotify,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(InfoWindow);
