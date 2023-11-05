import {Search} from "react-bootstrap-icons";
import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";

function Layout({ children, onSearchChange, searchPlaceholder }) {

  return (
    <Container>
      <Row className="p-3">
        <Col sm={12} md={8}>
          <Nav pills fill>
            <NavItem>
              <NavLink
                active={window.location.pathname === '/'}
                href="/"
              >
                {'Blogs'}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={window.location.pathname === '/schedules'} href="/schedules">
                {'Schedules'}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col sm={12} md={4}>
          <InputGroup>
            <Input onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder}/>
            <InputGroupText>
              <Search/>
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
      {children}
    </Container>
  );
}

export default Layout;
