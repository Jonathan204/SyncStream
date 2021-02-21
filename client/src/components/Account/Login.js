import React, { useContext, useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { AccountContext } from "./AccountContext";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/account";
import "./styles.css";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const userError = useSelector((state) => state.account.loginError);
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
      <Row className="mt-4" style={{ textAlign: "center" }}>
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
            Login
          </Button>
        </Row>
        <Row className="flex-column mt-3" style={{ textAlign: "center" }}>
          <p class="underline-on-hover" onClick={switchToSignup}>
            Don't have an account? Create one!
          </p>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
