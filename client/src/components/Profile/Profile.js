import React, { Component } from "react";
import { Image, Row, Col, Card, Button } from "react-bootstrap";
import profilePicture from "../../images/default_account.png";
import { connect } from "react-redux";
import { getUser } from "../../actions/users";
import { updateUser, logout } from "../../actions/account";
import { withRouter } from "react-router-dom";

import "./styles.css";

class Profile extends Component {
  state = {
    username: "",
    email: "",
    spotifyUserId: "",
    editing: false,
  };

  componentDidMount = () => {
    this.props.getUser(localStorage.getItem("userId"));
    this.setState({
      username: this.props.account.username,
      email: this.props.account.email,
      spotifyUserId: this.props.account.spotifyUserId,
    });
  };

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
    const username = this.state.username;
    const email = this.state.email;
    const spotifyUserId = this.state.spotifyUserId;
    const editing = this.state.editing;
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
                      ></input>
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
                      ></input>
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
                      <Button type="submit" onClick={this.handleSubmitProfile}>
                        Submit
                      </Button>
                    ) : (
                      <Button type="submit" onClick={this.handleEditProfile}>
                        Edit Profile
                      </Button>
                    )}
                    <Button
                      className="ml-3"
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
                <Image
                  src={profilePicture}
                  width="20%"
                  height="20%"
                  alt="logo"
                  className="d-inline-block align-top"
                  roundedCircle
                />
                <Card.Title>{username}</Card.Title>
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
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => {
    dispatch(getUser(id));
  },
  updateUser: (id, user) => {
    dispatch(updateUser(id, user));
  },
  logoutUser: () => {
    dispatch(logout());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
