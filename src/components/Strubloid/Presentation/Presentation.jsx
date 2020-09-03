import React from "react";
import Rellax from "rellax";

import "./Presentation.scss"

import ScrollTransparentNavbar from "components/Strubloid/Navbars/ScrollTransparentNavbar";
import StrubloidMainHeader from "./MainHeader"

import StrubloidHistory from "components/Strubloid/FrontendWork/History";
import StrubloidGithub from "components/Strubloid/Github/Github";
import StrubloidAboutMe from "components/Strubloid/AboutMe/Block/AboutMe";

import StrubloidFooterBlack from "components/Strubloid/Footers/FooterBlack";
// import StrubloidFooterBlack from "components/Strubloid/Footers/FooterBlackSocial";

function Presentation() {
  React.useEffect(() => {
    document.body.classList.add("presentation-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // initialise Rellax for this page
    if (window.innerWidth >= 991) {
      setTimeout(function () {
        new Rellax(".rellax", {
          center: true,
        });
      }, 5000);
      new Rellax(".rellax-header");
      new Rellax(".rellax-text");
    }

    // we need to add a script for the github buttons
    let script = document.createElement("script");
    script.src = "https://buttons.github.io/buttons";
    script.id = "github-buttons-script-id";
    document.body.appendChild(script);

    return function cleanup() {
      document.body.classList.remove("presentation-page");
      document.body.classList.remove("sidebar-collapse");

      // we need to remove the script when we change the page
      script.parentNode.removeChild(script);
    };
  });
  return (
    <>
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <StrubloidMainHeader />
        <StrubloidHistory />
        <StrubloidGithub />
        <StrubloidAboutMe />
        <StrubloidFooterBlack />
      </div>
    </>
  );
}

export default Presentation;
