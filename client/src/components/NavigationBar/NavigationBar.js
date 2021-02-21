import { Nav, Navbar, Image } from "react-bootstrap";
import logo from "../../images/logo.png";
import profilePicture from "../../images/default_account.png";

const sticky = {
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "1 ",
};

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" style={sticky}>
      <Navbar.Brand href="/home">
        <Image
          src={logo}
          width="30"
          height="30"
          alt="logo"
          className="d-inline-block align-top"
        />{" "}
        SyncStream
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/profile">
          <Image src={profilePicture} width="30" height="30" roundedCircle />{" "}
          Account
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
