import React from 'react'
import { Image, Container, Row } from 'react-bootstrap';
import profilePicture from "../../../images/default_account.png";

const InfoWindow = (props) => {

  const infoWindowStyle = {
    position: 'relative',
    bottom: 200,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <Container>
        <Row>
          <div>Hello user!</div>
        </Row>
        <Row>
          <Image
            src={profilePicture}
            width="30"
            height="30"
            roundedCircle
          />
        </Row>
      </Container>

    </div>
  );
};

export default InfoWindow;
