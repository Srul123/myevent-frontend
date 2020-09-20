import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import HomePage from './home-page/HomePage'
import SignUp from './sign-up/SignUp'
import SignIn from './sign-in/SignIn'

import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

export default function Views() {
    return (
            <Router>
                <Header />
                <Switch>
                    <Route path={"/"} exact component={HomePage} />
                    <Route path={"/signup"} exact component={SignUp} />
                    <Route path={"/signin"} exact component={SignIn} />
                </Switch>
                <Footer />
            </Router>
    );
}
