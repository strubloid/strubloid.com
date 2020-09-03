import React, { Component } from "react";

import "./MainHeader.scss"

class MainHeader extends Component {

  topBackground = {
    backgroundImage:
        "url(" +
        require("assets/img/presentation-page/nuk-pro-back-sky.jpg") +
        ")",
  };

  bottomBackground ={
    backgroundImage:
        "url(" +
        require("assets/img/presentation-page/nuk-pro-buildings.png") +
        ")",
  };

  homepageName = 'Strubloid.com';
  firstMessage = 'A mix between lines of code and light!';

  render() {
    return (
        <>
          <div className="page-header clear-filter">
            <div className="rellax-header rellax-header-sky" data-rellax-speed="-4">
              <div className="page-header-image" style={this.topBackground}></div>
            </div>
            <div className="rellax-header rellax-header-buildings"data-rellax-speed="0">
              <div className="page-header-image page-header-city" style={this.bottomBackground}></div>
            </div>
            <div className="rellax-text-container rellax-text" data-rellax-speed="-5" >
              <h1 className="h1-seo" >{this.homepageName}</h1>
            </div>
            <h3 className="h3-description rellax-text" data-rellax-speed="5">
              {this.firstMessage}
            </h3>
          </div>
        </>
    );
  }
}

export default MainHeader;