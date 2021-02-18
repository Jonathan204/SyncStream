import React, { useContext, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { AccountContext } from './AccountContext';

const Register = () => {
    const [validated, setValidated] = useState(false);
    const {switchToSignin} = useContext(AccountContext);

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
            <h3>Please Sign Up!</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group conrolId="email">
                    <Form.Control type="email" placeholder="Email" required/>
                    <Form.Control.Feedback type="invalid">
                        Please input a valid email
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Control required type="text" placeholder="Username" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid username
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control required type="password" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid password
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Control required type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Button className="m-2" variant="primary" type="submit">
                    Register
                </Button>

                <Button className="m-2" variant="primary" type="submit" onClick={switchToSignin}>
                    Already have an account?
                </Button>
            </Form>
            <Button className="m-2"  href="/home" variant="primary">
                    takes you to main page (temp)
            </Button>
        </Container>
    );
}

export default Register;
