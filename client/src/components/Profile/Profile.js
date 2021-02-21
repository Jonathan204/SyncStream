import React from "react";
import {
  Form,
  Image,
  Row,
  Col,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import profilePicture from "../../images/default_account.png";
import "./styles.css";

const Profile = () => {
  return (
    <div className="margin-box">
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Username</label>
                      <Form.Control
                        placeholder="Username"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Form.Control
                        placeholder="Email"
                        type="email"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <Form.Group>
                      <label>First Name</label>
                      <Form.Control
                        placeholder="First Name"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group>
                      <label>Last Name</label>
                      <Form.Control
                        placeholder="Last Name"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>City</label>
                      <Form.Control
                        placeholder="City"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="5">
                    <Form.Group>
                      <label>Country</label>
                      <Form.Control
                        placeholder="Country"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>About Me</label>
                      <Form.Control
                        cols="80"
                        rows="4"
                        as="textarea"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Update Profile
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <div className="card-image"></div>
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <Image
                    src={profilePicture}
                    width="20%"
                    height="20%"
                    alt="logo"
                    className="d-inline-block align-top"
                    roundedCircle
                  />
                  <h5 className="title">Mike Andrew</h5>
                </a>
                <p className="description">mikemike</p>
              </div>
            </Card.Body>
            <hr></hr>
            <div className="button-container mr-auto ml-auto">
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-google-plus-square"></i>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
