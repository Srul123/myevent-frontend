import React from "react";
import AppBarMain from "./AppBarMain";
import AppBarLoginWithIcons from "./app-bar-login-with-Icons/AppBarLoginWithIcons";
import { useSelector } from "react-redux";

export default function Header() {
  const isLoggedIn = useSelector((state) => {
    return state.userReducer.login;
  });

  return <>{isLoggedIn ? <AppBarLoginWithIcons /> : <AppBarMain />}</>;
}
