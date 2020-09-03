import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";

import AboutMe from "components/Strubloid/AboutMe/AboutMe";
import BlogPost from "components/Strubloid/Blog/BlogPost";
import BlogPosts from "components/Strubloid/Blog/BlogPosts";
import ContactMe from "components/Strubloid/Contact/ContactMe";

import Presentation from "components/Strubloid/Presentation/Presentation";

const App = () =>  (
    <BrowserRouter>
        <Switch>
            <Route path="/about-me" render={(props) => <AboutMe {...props} />} />
            <Route path="/blog-post" render={(props) => <BlogPost {...props} />} />
            <Route path="/blog-posts" render={(props) => <BlogPosts {...props} />} />
            <Route path="/contact-me" render={(props) => <ContactMe {...props} />} />
            <Route path="/presentation" render={(props) => <Presentation {...props} />}/>
            <Redirect to="/presentation" />
        </Switch>
    </BrowserRouter>
)

export default App;