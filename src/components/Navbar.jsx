import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';

const NavbarComponent = () => {
  const navigate = useNavigate()
  return (
    <Navbar collapseOnSelect expand="md" fixed="top" className="nav-style">
      <Container fluid>
        <Navbar.Brand style={{cursor: "pointer"}} onClick={() => navigate("/")} className='navbar-tabs'>Fintech App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
            <Nav.Link onClick={() => navigate("/Offers")} className='navbar-tabs'>Offers</Nav.Link>
            <Nav.Link onClick={() => navigate("/complaints-analysis")} className='navbar-tabs'>Complaint Analysis</Nav.Link>
            <Nav.Link onClick={() => navigate("/software-update")} className='navbar-tabs'>Software Update</Nav.Link>
            <Nav.Link onClick={() => navigate("/predictions")} className='navbar-tabs'>Predictions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;