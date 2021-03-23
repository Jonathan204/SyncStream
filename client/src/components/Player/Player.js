import React from "react";
import "./styles.css";
import SpotifyLogo from "../../images/spotify-logo.png";
import { Container, Row, Col } from "react-bootstrap";


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlay: false,
      song_uri: "",
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);

  }
  componentDidMount() {
    var endUri = "";
    var uri = this.props.songUri;
    if(uri){
      var splitUri = (uri).split(":");
      endUri = splitUri[2];      
    }

    this.setState({
      song_uri: endUri,
    });
  }


  handleClick = () => {
    this.setState((state) => ({
      showPlay: !state.showPlay,
    }));
  }

  render(){
    const progressBarStyles = {
      width: (this.props.progress_ms * 100) / this.props.item.duration_ms + "%",
    };
    return (
      <Container>
        {this.state.showPlay ? (
          <div>
            <iframe title="webplayer" src={"https://open.spotify.com/embed/track/"+this.state.song_uri} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <button
                className="stop-listen-btn stop-listen-btn--loginApp-link"
                onClick={this.handleClick}
              >
                Stop Listening!
              </button>
          </div>
        ) : (
          <div>
            <Row>
              <Col>
                <div className="now-playing__img">
                  {this.props.is_ad ? (
                    <img src={SpotifyLogo} alt="album" />
                  ) : (
                    <img src={this.props.item.album.images[0].url} alt="album" />
                  )}
                </div>
              </Col>
              <Col>
                <div className="now-playing__side">
                  {this.props.is_ad ? (
                    <div className="now-playing__name">ADVERTISEMENT</div>
                  ) : (
                    <div className="now-playing__name">{this.props.item.name}</div>
                  )}
                  {this.props.is_ad ? (
                    <div className="now-playing__artist">SPOTIFY</div>
                  ) : (
                    <div className="now-playing__artist">
                      {this.props.item.artists[0].name}
                    </div>
                  )}
                  <div className="now-playing__status">
                    {this.props.is_playing ? "Playing" : "Paused"}
                  </div>
                  {!this.props.is_ad && (
                      <div>{this.props.songTime}</div>
                  )}
                 
                  <div className="progress">
                    <div className="progress__bar" style={progressBarStyles} />
                  </div>
                  {!this.props.is_me && (
                    <div>
                    <button
                      className="listen-btn listen-btn--loginApp-link"
                      onClick={this.handleClick}
                    >
                      Listen in!
                    </button>
                    
                  </div>
                )}
                </div>
              </Col>
            </Row>
          </div>
        )}

      </Container>
    );
  }
}


export default Player;
