import React, { useContext, useState } from "react";
import { Form, Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { AccountContext } from "./AccountContext";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/account";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const userError = useSelector((state) => state.account.loginError);
  const id = useSelector((state) => state.account.id);
  localStorage.setItem("userId", id);
  const loading = useSelector((state) => state.account.loading);
  const { switchToSignup } = useContext(AccountContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      dispatch(loginUser(userData, history));

    }
  };

  return (
    <Container className="account-height">
      <Row className="mt-4 align-text-center">
        <Col>
          <h3>Welcome Back!</h3>
        </Col>
      </Row>
      <Form
        className="mt-5"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
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
        {userError}
        <Row className="mt-5">
          <Button
            className="submit-button"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Login
          </Button>
        </Row>
        <Row className="flex-column mt-3 align-text-center">
          <p className="underline-on-hover" onClick={switchToSignup}>
            Don't have an account? Create one!
          </p>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
