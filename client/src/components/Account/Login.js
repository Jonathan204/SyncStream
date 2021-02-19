import React, { useContext, useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { AccountContext } from './AccountContext';
import './styles.css';

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
            <Row className='mt-3' style={{textAlign:'center'}}><Col><h3>Welcome Back!</h3></Col></Row>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="flex-column">
                        <Form.Group conrolId="username">
                            <Form.Control required type="text" placeholder="Username"/>
                            <Form.Control.Feedback type="invalid">
                                Please input a valid username
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="flex-column">
                        <Form.Group controlId="password">
                            <Form.Control required type="password" placeholder="Password"/>
                            <Form.Control.Feedback type="invalid">
                                Please input a valid password
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button style={{width:'100%', borderRadius:'25px', marginLeft:'30px', marginRight: '30px', fontWeight:'bold'}} variant="primary" type="submit">
                            Login
                        </Button>
                    </Row>
                    <Row className='flex-column'>
                        <p class='underline-on-hover' onClick={switchToSignup}>
                            Don't have an account? Create one!
                        </p>
                    </Row>
                </Form>
        </Container>
    );
}

export default Login;
