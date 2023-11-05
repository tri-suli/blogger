import {useEffect, useState} from "react";
import _ from "lodash";
import {Search} from "react-bootstrap-icons";
import {
  Card,
  CardBody, CardSubtitle, CardText, CardTitle,
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

import blogService from "../services/blog.service";

function Home() {
  const [blogKeyword, setBlogKeyword] = useState('');
  const [blogs, setBlogs] = useState([]);

  const handleSearchBlogs = _.debounce((value) => {
    console.log(value)
    setBlogKeyword(value)
  }, 1000)

  useEffect(() => {
    if (_.isEmpty(blogs)) {
      blogService.fetchAll().then((result) => {
        setBlogs(result);
      });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(blogKeyword)) {
      blogService.fetchAll(blogKeyword).then((result) => {
        setBlogs(result);
      });
    }
  }, [blogKeyword])

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
            <Input onChange={(e) => handleSearchBlogs(e.target.value)} placeholder="Search blogs"/>
            <InputGroupText>
              <Search/>
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {blogs.map((blog) => (
          <Col sm={12} md={4} lg={3} key={blog._id}>
            <Card
              style={{width: '18rem'}}
            >
              <img
                alt="Sample"
                src="https://picsum.photos/300/200"
              />
              <CardBody>
                <CardTitle tag="h5">
                  {blog.title}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {`${blog.creator.name}`}
                </CardSubtitle>
                <CardText>
                  {blog.content}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
