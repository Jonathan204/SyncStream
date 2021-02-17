import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';

function Register() {
    return (
        <Container>
            <h3>Please Sign Up!</h3>
            <Form>
                <Form.Group conrolId="email">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Control placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;