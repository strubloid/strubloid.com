/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { Link } from 'react-router-dom'

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer" data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <Link to="/">Strubloid.com</Link>
              </li>
              <li>
                <Link to="/about-me">About me</Link>
              </li>
              <li>
                <Link to="/blog-posts">Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            MIT License {new Date().getFullYear()} Strubloid.com
          </div>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
