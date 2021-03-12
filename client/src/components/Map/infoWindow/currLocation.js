import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles.css";
import * as $ from "jquery";
import { connect } from "react-redux";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "../../Player/Player";
import { hash } from "../../../hash";
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

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = this.props.user.spotifyAccess;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
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
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        if (data.item != null) {
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms,
            is_ad: false,
            no_data: false /* We need to "reset" the boolean, in case the
                                  user does not give F5 and has opened his Spotify. */,
          });
        } else {
          this.setState({
            is_ad: true,
            no_data: false,
          });
        }
      },
    });
  }

  render() {
    return (
      <div className="infoWindowStyle">
        <Container>
          <Row className="text-center">
            {!this.state.token && (
              <a
                className="spotify-btn spotify-btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=code&show_dialog=true`}
              >
                Login to Spotify
              </a>
            )}
            {this.state.token && !this.state.no_data && !this.state.is_ad && (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
              />
            )}
            {this.state.no_data && (
              <p>
                You need to be playing a song on Spotify, for something to
                appear here.
              </p>
            )}
            {this.state.is_ad && (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
                is_ad={this.state.is_ad}
              />
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
export default connect(mapStateToProps)(InfoWindow);
