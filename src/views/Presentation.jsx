import React from "react";
// javascript library that creates a parrallax effect
import Rellax from "rellax";
// reactstrap components

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar";
import PresentationHeader from "components/Headers/PresentationHeader";
import FooterBlack from "components/Footers/FooterBlack";

// sections for this page
import Components from "./presentation-sections/Components";
import BasicComponents from "./presentation-sections/BasicComponents";
import Cards from "./presentation-sections/Cards";
import Content from "./presentation-sections/Content";
import Sections from "./presentation-sections/Sections";
import Examples from "./presentation-sections/Examples";
import FreeDemo from "./presentation-sections/FreeDemo";
import Icons from "./presentation-sections/Icons";
import Image from "./presentation-sections/Image";
import Testimonials from "./presentation-sections/Testimonials";
import Pricing from "./presentation-sections/Pricing";

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
        <PresentationHeader />
        <Components />
        <BasicComponents />
        <Cards />
        <Content />
        <Sections />
        <Examples />
        <FreeDemo />
        <Icons />
        <Image />
        <Testimonials />
        <Pricing />
        <FooterBlack />
      </div>
    </>
  );
}

export default Presentation;
