import { Nav, Navbar, Image } from "react-bootstrap";
import logoWhite from "../../images/logoWhite.png";
import profilePicture from "../../images/default_account.png";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const profilePic = useSelector((state) => state.account.profilePic);
  return (
    <Navbar className="sticky navbar-colors">
      <NavLink to="/home" className="navlink-style">
        <Image
          src={logoWhite}
          width="40"
          height="40"
          alt="logo"
          className="d-inline-block align-top"
        />{" "}
        <Navbar.Text className="navbar-text">SyncStream</Navbar.Text>
      </NavLink>
      <Nav className="ml-auto">
        <NavLink to="/profile" className="navlink-style">
          <Image
            src={profilePic ? profilePic : profilePicture}
            width="40"
            height="40"
            className="d-inline-block align-top"
            roundedCircle
          />{" "}
          <Navbar.Text className="navbar-text">Account</Navbar.Text>
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
