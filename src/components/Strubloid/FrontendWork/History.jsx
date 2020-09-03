import React, { Component } from "react";

import "./History.scss"
import { Col, Container, Row } from 'reactstrap'

class History extends Component {

  // TODO: tou must create each card component
  component1 = <div className="card-container first-card">
    <div className="card-component">
      <a href="#pablo" onClick={(e) => e.preventDefault()}>
        <div className="front">
          <img
              alt="..."
              src={require("assets/img/presentation-page/basic_thumb.jpg")}
          ></img>
        </div>
      </a>
    </div>
  </div>

  component2 = <div className="card-container second-card">
    <div className="card-component">
      <a href="#pablo" onClick={(e) => e.preventDefault()}>
        <div className="front">
          <img
              alt="..."
              src={require("assets/img/presentation-page/cards_thumb.jpg")}
          ></img>
        </div>
      </a>
    </div>
  </div>

  component3 = <div className="card-container third-card">
    <div className="card-component">
      <a href="sections.html">
        <div className="front">
          <img
              alt="..."
              src={require("assets/img/presentation-page/sections_thumb.jpg")}
          ></img>
        </div>
      </a>
    </div>
  </div>

  component4 = <div className="card-container fourth-card">
    <div className="card-component">
      <a href="examples/product-page.html">
        <div className="front">
          <img
              alt="..."
              src={require("assets/img/presentation-page/pages2_thumb.jpg")}
          ></img>
        </div>
      </a>
    </div>
  </div>


  render() {
    return (
        <>
          <div
              className="section section-components"
              data-background-color="dark-blue"
          >
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="8">
                  <h2 className="text-center title">Some work that I'd to build <br></br>
                    <small className="description">
                      (Front-End Resume)
                    </small>
                  </h2>
                  <h5 className="text-center description">
                    Life is a very curious box, sometimes I use this box to expand my mind, for that
                    I had to work with different layouts, some are very special, and those are here.
                    So grab your coffee mug, and enjoy!
                  </h5>
                  <div className="space-50"></div>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  {this.component1}
                </Col>
                <Col md="3">
                  {this.component2}
                </Col>
                <Col md="3">
                  {this.component3}
                </Col>
                <Col md="3">
                  {this.component4}
                </Col>
              </Row>
            </Container>
          </div>
        </>
    );
  }
}

export default History;