import React from "react";

// reactstrap components

// core components
import WhiteNavbar from "components/Navbars/WhiteNavbar";
import Footer from "components/Footers/Footer";

// sections for this page
import Headers from "./sections-sections/Headers";
import Features from "./sections-sections/Features";
import Blogs from "./sections-sections/Blogs";
import Teams from "./sections-sections/Teams";
import Projects from "./sections-sections/Projects";
import Pricing from "./sections-sections/Pricing";
import Testimonials from "./sections-sections/Testimonials";
import ContactUs from "./sections-sections/ContactUs";

function Sections() {
  React.useEffect(() => {
    document.body.classList.add("sections-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    var href = window.location.href.substring(
      window.location.href.lastIndexOf("#/") + 2
    );
    var hrefId = href.substring(href.lastIndexOf("#") + 1);
    if (href.lastIndexOf("#") > 0) {
      document.getElementById(hrefId).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return function cleanup() {
      document.body.classList.remove("sections-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <WhiteNavbar />
      <div className="wrapper">
        <div className="section-space"></div>
        <Headers />
        <Features />
        <Blogs />
        <Teams />
        <Projects />
        <Pricing />
        <Testimonials />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
}

export default Sections;
