import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

// core components
import FixedTransparentNavbar from "components/Strubloid/Navbars/FixedTransparentNavbar";
import Footer from "components/Strubloid/Footers/FooterBlack.jsx";

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      'firstFocus' : false,
      'lastFocus' : false
    };
  }

  componentDidMount()
  {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render ()
  {

    return (
        <>
          <FixedTransparentNavbar />
          <div className="page-header header-filter" filter-color="blue">
            <div className="page-header-image" style={{
                  backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
                }}
            ></div>
            <div className="content">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto" md="5">
                    <Card className="card-login card-plain">
                      <Form action="/test" className="form" method="POST">
                        <CardBody>
                          <InputGroup
                              className={
                                "no-border input-lg" +
                                (this.state.firstFocus ? " input-group-focus" : "")
                              }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Username"
                                type="text"
                                onFocus={() => this.setState({ 'firstFocus' : true})}
                                onBlur={() => this.setState({ 'firstFocus' : false})}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                              className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")
                              }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Password"
                                type="password"
                                onFocus={() => this.setState({ 'lastFocus' : true})}
                                onBlur={() => this.setState({ 'lastFocus' : false})}
                            ></Input>
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                              className="btn-round"
                              color="info"
                              type="submit"
                          >
                            Login
                          </Button>
                        </CardFooter>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
            <Footer />
          </div>
        </>
    )
  }
}

export default Login;
