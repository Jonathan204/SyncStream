import React, { useContext } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { AccountContext } from './AccountContext';

const Login = () => {

    const {switchToSignup} = useContext(AccountContext);

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

                <Button className="m-2" variant="primary" type="submit">
                    Login
                </Button>

                <Button className="m-2" variant="primary" type="submit" onClick={switchToSignup}>
                    Create an account!
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
