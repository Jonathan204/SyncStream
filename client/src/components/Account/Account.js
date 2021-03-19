import React, { useState } from "react";
import Login from "./Login.js";
import { Container } from "react-bootstrap";
import { AccountContext } from "./AccountContext.js";
import Register from "./Register.js";

import "./styles.css";

const Account = () => {
  const [activeWindow, setActiveWindow] = useState("signin");

  const switchToSignup = () => {
    setActiveWindow("signup");
  };

  const switchToSignin = () => {
    setActiveWindow("signin");
  };

  const contextValue = { switchToSignup, switchToSignin };
  return (
    <AccountContext.Provider value={contextValue}>
      <Container className="border account-window">
        {activeWindow === "signin" && <Login />}
        {activeWindow === "signup" && <Register />}
      </Container>
    </AccountContext.Provider>
  );
};

export default Account;
