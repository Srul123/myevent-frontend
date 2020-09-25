import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./home-page/HomePage";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import MyProfile from "./my-profile/MyProfile";

import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

export default function Views() {
  const isLoggedIn = useSelector((state) => {
    return state.userReducer.login;
  });
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/myprofile"} exact component={MyProfile} />
      </Switch>
      <Footer />
    </Router>
  );
}
