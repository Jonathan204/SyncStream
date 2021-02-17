import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';

export function Login () {
    return (
        <Container>
            <h3>Welcome Back!</h3>
            <Form>
                <Form.Group conrolId="username">
                    <Form.Control placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;