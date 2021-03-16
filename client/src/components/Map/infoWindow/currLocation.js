import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import { authorizationUrl } from "../../../utils/spotifyUtils";
import { getCurrentlyPlaying } from "../../../utils/spotifyUtils";
import { updateUser } from "../../../actions/account";
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
    if (this.props.myself) {
      let _token = this.props.user.spotifyAccess;
      if (_token) {
        this.setState({
          token: _token,
        });
        this.getSong(_token);
      }
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.token) {
      this.getSong(this.state.token);
    }
  }

  getSongInfo(data) {
    var newState = {};
    if (!data || !data.currently_playing_type) {
      newState = {
        no_data: true,
      };
    } else {
      if (data.currently_playing_type === "track") {
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
      if (this.props.myself && token) {
        data = await getCurrentlyPlaying(token);
        data = this.getSongInfo(data);
        const songInfo = {
          ...data,
          lastPlayed: new Date(), // key to let other users know if this user is active
        };
        this.props.updateUser(this.props.user.id, { songInfo });
      } else {
        // TODO: call backend for other user
      }
    } catch (error) {
      console.log(error);
    }
    this.setState(data);
  }

  render() {
    return (
      <div className="infoWindowStyle">
        <Container>
          <Row className="text-center">
            {!this.state.token && (
              <a
                className="spotify-btn spotify-btn--loginApp-link"
                href={authorizationUrl}
              >
                Login to Spotify
              </a>
            )}
            {this.state.token && !this.state.no_data && (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
                is_ad={this.state.is_ad}
              />
            )}
            {this.state.no_data && (
              <p>
                {this.props.myself
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
  };
};

const mapDispatchToProps = () => {
  return {
    updateUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(InfoWindow);
