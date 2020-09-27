import React from "react";
import AppBarMain from "./AppBarMain";
import AppBarLogin from "./AppBarLogin";
import { useSelector } from "react-redux";

export default function Header() {
  const isLoggedIn = useSelector((state) => {
    return state.userReducer.login;
  });

  return <>{true ? <AppBarLogin /> : <AppBarMain />}</>;
}
