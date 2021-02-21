import React, { useContext, useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AccountContext } from "./AccountContext";
import { createUser } from "../../actions/account";
import "./styles.css";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userError = useSelector((state) => state.account.createError);
  const userCreated = useSelector((state) => state.account.createMessage);
  const { switchToSignin } = useContext(AccountContext);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch(createUser(userData));
    }
  };

  return (
    <Container className="account-height">
      <Row className="mt-4" style={{ textAlign: "center" }}>
        <Col>
          <h3>Please Sign Up!</h3>
        </Col>
      </Row>
      <Form
        className="mt-5"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="flex-column">
          <Form.Group controlId="email">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid email
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="flex-column">
          <Form.Group controlId="username">
            <Form.Control
              name="username"
              required
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid username
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="flex-column">
          <Form.Group controlId="password">
            <Form.Control
              name="password"
              required
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid password
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="flex-column">
          <Form.Group controlId="confirmPassword">
            <Form.Control
              name="password"
              required
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        {userError || userCreated}
        <Row className="mt-5">
          <Button
            style={{
              width: "100%",
              borderRadius: "25px",
              marginLeft: "30px",
              marginRight: "30px",
              fontWeight: "bold",
            }}
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        </Row>
        <Row className="flex-column mt-3" style={{ textAlign: "center" }}>
          <p class="underline-on-hover" onClick={switchToSignin}>
            Already have an account? Login!
          </p>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
