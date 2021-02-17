import React from 'react';

import Login from './Login.js';
import { Container } from 'react-bootstrap';

export function Account() {
    return (
        <Container className="border rounded">

            <Login />

        </Container>
    );
}

export default Account;