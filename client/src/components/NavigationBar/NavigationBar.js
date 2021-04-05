import { Nav, Navbar, Image } from "react-bootstrap";
import logoWhite from "../../images/logoWhite.png";
import profilePicture from "../../images/default_account.png";
import "./styles.css";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar className="sticky navbar-colors">
      <NavLink to="/home">
        <Navbar.Text className="navbar-text">
          <Image
            src={logoWhite}
            width="40"
            height="40"
            alt="logo"
            className="d-inline-block align-top"
          />{" "}
          SyncStream
        </Navbar.Text>
      </NavLink>
      <Nav className="ml-auto">
        <NavLink to="/profile">
          <Navbar.Text className="navbar-text">
            <Image src={profilePicture} width="40" height="40" roundedCircle />{" "}
            Account
          </Navbar.Text>
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
