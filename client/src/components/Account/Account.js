import { useState } from 'react';

import Login from './Login.js';
import { Container, Row, Col } from 'react-bootstrap';
import { AccountContext } from './AccountContext.js';
import Register from './Register.js';

const Account = () => {
    const [activeWindow, setActiveWindow] = useState("signin");

    const switchToSignup = () => {
        setActiveWindow("signup")
    }

    const switchToSignin = () => {
        setActiveWindow("signin")
    }

    const accountWindow = {
        height: 550,
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 20,
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)'
      };

    const contextValue = {switchToSignup, switchToSignin};
    return (
        <AccountContext.Provider value={contextValue}>
        <Container className="border" style={accountWindow}>

                {activeWindow === "signin" && <Login />}
                {activeWindow === "signup" && <Register />}

        </Container>
        </AccountContext.Provider>
    );
}

export default Account;
