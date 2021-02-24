import React from "react";
import { Image, Row, Col, Card } from "react-bootstrap";
import profilePicture from "../../images/default_account.png";
import "./styles.css";

const Profile = () => {
  return (
    <div className="margin-box">
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">User Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="bottom-margin">
                <Col className="pr-1" md="6">
                  <Card.Title>Username</Card.Title>
                  <Card.Text> Sync Streamer</Card.Text>
                </Col>
                <Col className="pl-1" md="6">
                  <Card.Title>Email address</Card.Title>
                  <Card.Text>Sync.Streamer@example.com</Card.Text>
                </Col>
              </Row>
              <Row className="bottom-margin">
                <Col>
                  <Card.Title>Password</Card.Title>
                  <Card.Text>************</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Card.Title>Spotify Information</Card.Title>
                </Col>
              </Row>
              <Row>
                <Col xs="2">
                  <Card.Text className="bold-title">Username:</Card.Text>
                </Col>
                <Col>
                  <Card.Text>SpotifyLover2</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <Card.Body>
              <Image
                src={profilePicture}
                width="20%"
                height="20%"
                alt="logo"
                className="d-inline-block align-top"
                roundedCircle
              />
              <Card.Title>Sync Streamer</Card.Title>
              <Card.Text>Sync.Streamer@example.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
