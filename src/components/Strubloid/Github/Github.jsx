import React, { Component } from "react";

import "./Github.scss"
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

class Github extends Component {

  render() {
    return (
        <>
            <div className="section section-free-demo">
                <Container>
                    <Row>
                        <Col lg="7" md="12">
                            <div className="section-description">
                                <h2 className="title">Github</h2>
                                <h6 className="category">Some of my projects that I'm enjoying now</h6>
                                <h5 className="description">
                                    Here you will find some good content from my Github account, as I had to export some
                                    projects from my own personal git repository to become public on the github.
                                </h5>
                                <div className="github-buttons">
                                    <Button className="btn-round" color="info" href="https://github.com/strubloid" target="_blank">
                                        Check me out on Github!
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <Row>
                                <Col className="pt-5" md="6">
                                    <Link to={{ pathname: 'https://github.com/strubloid/resume' }} target="_blank" >
                                        <Card className="card-pricing card-background" style={{ backgroundImage: "url(" + require("assets/img/project1.jpg") + ")",}}>
                                        <CardBody>
                                            <CardTitle tag="h3">My Resume</CardTitle>
                                            <ul>
                                                <li>
                                                    This is a collection of explanations that I'd to do for co-workers
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons design_app"></i>{" "} TSQL
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons shopping_credit-card"></i>{" "} Shell
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons ui-2_settings-90"></i>{" "} PHP
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons design-2_html5"></i>{" "} HTML
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons education_atom"></i>{" "} Javascript
                                                </li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                    </Link>
                                </Col>
                                <Col className="pt-5" md="6">
                                    <Link to={{ pathname: 'https://github.com/strubloid/.bash_aliases' }} target="_blank" >
                                        <Card className="card-pricing card-background" style={{ backgroundImage: "url(" + require("assets/img/project1.jpg") + ")",}}>
                                        <CardBody>
                                            <CardTitle tag="h3">.bash_aliases</CardTitle>
                                            <ul>
                                                <li>
                                                    This is mainly a new way to create your ~/.bash_aliases
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons design_bullet-list-67"></i>{" "} .bash_aliases in classes
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons arrows-1_refresh-69"></i>{" "} Update environment with: <br />tu [terminal update]
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons tech_laptop"></i>{" "} Linux & Mac
                                                </li>
                                                <li>
                                                    <i className="now-ui-icons shopping_credit-card"></i>{" "} Shellscript
                                                </li>
                                            </ul>
                                        </CardBody>
                                    </Card>
                                    </Link>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg="5" md="12">
                            <div className="github-background-container">
                                <i className="fab fa-github"></i>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
  }
}

export default Github;