import React, { Component } from "react";
import { Image, Row, Col, Card, Button } from "react-bootstrap";
import profilePicture from "../../images/default_account.png";
import { connect } from "react-redux";
import { getUser, getUsers } from "../../actions/users";
import { authorize } from "../../hash";
import { getTokens, getUserId } from "../../utils/spotifyUtils";
import { updateUser, logout } from "../../actions/account";
import { withRouter } from "react-router-dom";
import InfoWindow from "../Map/InfoWindow/InfoWindow";

import "./styles.css";
export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user_spotify_id: null,
      username: "",
      email: "",
      spotifyUserId: "",
      editing: false,
      isUser: true,
      users: null,
    };
  }

  componentDidMount = async () => {
    this.setState({
      username: this.props.account.username,
      email: this.props.account.email,
      spotifyUserId: this.props.account.spotifyUserId,
    });

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
    };
    const userId = localStorage.getItem("userId");
    this.props.updateUser(userId, userData);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitProfile = (event) => {
    event.preventDefault();
    this.setState({
      editing: false,
    });
    const user = { username: this.state.username, email: this.state.email };
    this.props.updateUser(localStorage.getItem("userId"), user);
  };

  handleEditProfile = (event) => {
    event.preventDefault();
    this.setState({
      editing: true,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { username, email, spotifyUserId, editing, isUser } = this.state;
    return (
      <div className="margin-box">
        <Row>
          <Col md="8">
            <Card className="card-style">
              <Card.Header>
                <Card.Title as="h4">User Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="bottom-margin">
                  <Col className="pr-1" md="6">
                    <Card.Title>Username</Card.Title>
                    {editing ? (
                      <input
                        name="username"
                        id="usernameInput"
                        type="text"
                        value={username}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <Card.Text>{username}</Card.Text>
                    )}
                  </Col>
                  <Col className="pl-1" md="6">
                    <Card.Title>Email address</Card.Title>
                    {editing ? (
                      <input
                        name="email"
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <Card.Text>{email}</Card.Text>
                    )}
                  </Col>
                </Row>
                <Row className="bottom-margin">
                  <Col>
                    <Card.Title>Password</Card.Title>
                    <Card.Text>**************</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Card.Title>Spotify Information</Card.Title>
                  </Col>
                  <Col>
                    {editing ? (
                      <Button
                        className="profile-submit-button"
                        type="submit"
                        onClick={this.handleSubmitProfile}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        className="profile-submit-button"
                        type="submit"
                        onClick={this.handleEditProfile}
                      >
                        Edit Profile
                      </Button>
                    )}
                    <Button
                      className="ml-3 profile-submit-button"
                      type="submit"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs="2">
                    <Card.Text className="bold-title">Username:</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>{spotifyUserId}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-style">
              <Card.Body>
                <Row className="spotifyCardRow1">
                  <Image
                    src={profilePicture}
                    width="20%"
                    height="20%"
                    alt="logo"
                    className="d-inline-block align-top"
                    roundedCircle
                  />
                  <Card.Title className="spotifyNameStyle">
                    {spotifyUserId}
                  </Card.Title>
                </Row>
                <Row className="spotifyCardRow2">
                  <InfoWindow className="profile-info-window" isUser={isUser} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  account: state.account,
  user: state.account,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => {
    dispatch(getUser(id));
  },
  getUsers: () => {
    dispatch(getUsers());
  },
  updateUser: (id, user) => {
    dispatch(updateUser(id, user));
  },
  logoutUser: () => {
    dispatch(logout());
  },
  updateSpotifyInfo: (id, authData) => {
    dispatch(updateUser(id, authData));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
