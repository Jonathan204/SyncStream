import React from "react";
import "./Player.css";
import SpotifyLogo from "../../images/spotify-logo.png";
import { Container, Row, Col } from 'react-bootstrap';
const Player = props => {

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="now-playing__img">
            {props.is_ad ? 
            <img src={SpotifyLogo} alt="album" /> :
            <img src={props.item.album.images[0].url} alt="album" />
            }
          </div>        
        </Col>
        <Col>
        <div className="now-playing__side">
           {props.is_ad ? 
            <div className="now-playing__name">ADVERTISEMENT</div> :
            <div className="now-playing__name">{props.item.name}</div>
           }
           {props.is_ad ? 
            <div className="now-playing__artist">SPOTIFY</div> :
            <div className="now-playing__artist">{props.item.artists[0].name}</div>
           }         
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Player;
