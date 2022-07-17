import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { lightModeLogo } from "../../assets/image";

function Header() {
  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/">
          <img src={lightModeLogo} alt="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/">About</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/work">Work</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
