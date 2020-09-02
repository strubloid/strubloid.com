import React from "react";

// reactstrap components

// core components
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar";
import IndexHeader from "components/Headers/IndexHeader";
import FooterBlack from "components/Footers/FooterBlack";

// sections for this page
import Images from "./index-sections/Images";
import Basic from "./index-sections/Basic";
import Navbars from "./index-sections/Navbars";
import Tabs from "./index-sections/Tabs";
import Pills from "./index-sections/Pills";
import Pagination from "./index-sections/Pagination";
import Notifications from "./index-sections/Notifications";
import PreFooter from "./index-sections/PreFooter";
import Footers from "./index-sections/Footers";
import Typography from "./index-sections/Typography";
import ContentAreas from "./index-sections/ContentAreas";
import Cards from "./index-sections/Cards";
import PlainCards from "./index-sections/PlainCards";
import Javascript from "./index-sections/Javascript";
import FileUploader from "./index-sections/FileUploader";
import Carousel from "./index-sections/Carousel";
import NucleoIcons from "./index-sections/NucleoIcons";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <Images />
          <Basic />
          <Navbars />
          <Tabs />
          <Pills />
          <Pagination />
          <Notifications />
          <PreFooter />
          <Footers />
          <Typography />
          <ContentAreas />
          <Cards />
          <PlainCards />
          <Javascript />
          <FileUploader />
          <Carousel />
          <NucleoIcons />
          <FooterBlack />
        </div>
      </div>
    </>
  );
}

export default Index;
