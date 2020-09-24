import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./home-page/HomePage";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import MyProfile from "./my-profile/MyProfile";

import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";
import DrawerApp from "../drawers/Drawer";

export default function Views() {
  const isLoggedIn = useSelector((state) => {
    console.log("state");
    console.log(state);
    return state.userReducer.login;
  });
  return (
    <Router>
      <Header />
      <div style={{ height: "5vh", background: "blue" }}>
        <DrawerApp />
      </div>
      <Switch>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/myprofile"} exact component={MyProfile} />
        {isLoggedIn && <DrawerApp />}
      </Switch>
      <Footer />
    </Router>
  );
}
