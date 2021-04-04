import { Nav, Navbar, Image } from "react-bootstrap";
import logo from "../../images/logo.png";
import profilePicture from "../../images/default_account.png";
import "./styles.css";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="sticky">
      <NavLink to="/home">
        <Navbar.Text>
          <Image
            src={logo}
            width="30"
            height="30"
            alt="logo"
            className="d-inline-block align-top"
          />{" "}
          SyncStream
        </Navbar.Text>
      </NavLink>
      <Nav className="ml-auto">
        <NavLink to="/profile">
          <Navbar.Text>
            <Image src={profilePicture} width="30" height="30" roundedCircle />{" "}
            Account
          </Navbar.Text>
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
