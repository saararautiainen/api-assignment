
import { Navbar, Nav} from 'react-bootstrap';
import '../App.css';


function Navigation() {
  return (
    <div className="Nav">
      <Navbar collapseOnSelect expand="lg" bg="light"  variant="light">
      <Nav style={{fontSize: '1.5em', fontWeight:'bold'}} className="m-auto">
      <Nav.Link href="#jackets">Jackets</Nav.Link>
      <Nav.Link href="#accessories">Accessories</Nav.Link>
      <Nav.Link href="#shirts">Shirts</Nav.Link>
      </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
