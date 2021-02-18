import React, { useContext, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";
import { AccountContext } from './AccountContext';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const {switchToSignup} = useContext(AccountContext);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        setValidated(true);
    }
    

    return (
        <Container>
            <h3>Welcome Back!</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group conrolId="username">
                    <Form.Control required type="text" placeholder="Username"/>
                    <Form.Control.Feedback type="invalid">
                        Please input a valid username
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control required type="password" placeholder="Password"/>
                    <Form.Control.Feedback type="invalid">
                        Please input a valid password
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="m-2" variant="primary" type="submit">
                    Login
                </Button>

                <Button className="m-2" variant="primary" type="submit" onClick={switchToSignup}>
                    Create an account!
                </Button>
            </Form>
            <Button className="m-2"  href="/home" variant="primary">
                    takes you to main page (temp)
            </Button>
        </Container>
    );
}

export default Login;
