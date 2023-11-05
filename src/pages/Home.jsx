import {Col, Container, Input, InputGroup, InputGroupText, Nav, NavItem, NavLink, Row} from "reactstrap";
import {Search} from "react-bootstrap-icons";

function App() {
  return (
    <Container>
      <Row className="p-3">
        <Col sm={12} md={8}>
          <Nav pills fill>
            <NavItem>
              <NavLink
                active
                href="#"
              >
                {'Blogs'}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                {'Schedules'}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm={12} md={4}>
          <InputGroup>
            <Input placeholder="Search blogs" />
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
