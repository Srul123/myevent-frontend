import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import HomePage from "./home-page/HomePage";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import MyProfile from "./my-profile/MyProfile";
import MyEventDetails from "./my-event-details/MyEventDetails";
import Container from '@material-ui/core/Container';


import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

export default function Views() {
    const isLoggedIn = useSelector((state) => {
        return state.userReducer.login;
    });

    const isLoginRoutesComps = (
        <>
            <Route path={"/myprofile"} exact component={MyProfile}/>
            <Route path={"/event-details"} exact component={MyEventDetails}/>
        </>
    );

    return (
        <Router>
            <Header/>
            <Container fixed>

            <Switch>
                <Route path={"/signup"} component={SignUp}/>
                <Route path={"/signin"} component={SignIn}/>
                <Route path={"/"} exact component={HomePage}/>
                {isLoggedIn ?
                    (isLoginRoutesComps) :
                    (<Redirect to="/signin"/>)}
            </Switch>
            </Container>

            <Footer/>
        </Router>
    );
}
