import React, { useContext, useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { AccountContext } from './AccountContext';
import './styles.css';

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
            <Row className='mt-3' style={{textAlign:'center'}}><Col><h3>Please Sign Up!</h3></Col></Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="flex-column">
                    <Form.Group conrolId="email">
                        <Form.Control type="email" placeholder="Email" required/>
                        <Form.Control.Feedback type="invalid">
                            Please input a valid email
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="flex-column">
                    <Form.Group controlId="username">
                        <Form.Control required type="text" placeholder="Username" />
                        <Form.Control.Feedback type="invalid">
                            Please input a valid username
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="flex-column">
                    <Form.Group controlId="password">
                        <Form.Control required type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please input a valid password
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="flex-column">
                    <Form.Group controlId="confirmPassword">
                        <Form.Control required type="password" placeholder="Confirm Password" />
                    </Form.Group>
                </Row>
                <Row>
                    <Button style={{width:'100%', borderRadius:'25px', marginLeft:'30px', marginRight: '30px', fontWeight:'bold'}} variant="primary" type="submit">
                        Register
                    </Button>
                </Row>
                <Row>
                    <p class='underline-on-hover' onClick={switchToSignin}>
                        Already have an account? Login!
                    </p>
                </Row>
            </Form>
        </Container>
    );
}

export default Register;
