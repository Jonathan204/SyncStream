import React, { useContext, useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { AccountContext } from './AccountContext';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const {switchToSignup} = useContext(AccountContext);
    const history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        setValidated(true);
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            history.push("/home");
        }
    }

    return (
        <Container class='account-height'>
            <Row className='mt-4' style={{textAlign:'center'}}><Col><h3>Welcome Back!</h3></Col></Row>
                <Form className='mt-5' noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <Row className='mt-5'>
                        <Button style={{width:'100%', borderRadius:'25px', marginLeft:'30px', marginRight: '30px', fontWeight:'bold'}} variant="primary" type="submit">
                            Login
                        </Button>
                    </Row>
                    <Row className='flex-column mt-3' style={{textAlign: 'center'}}>
                        <p class='underline-on-hover' onClick={switchToSignup}>
                            Don't have an account? Create one!
                        </p>
                    </Row>
                </Form>
        </Container>
    );
}

export default Login;
