import { LOGIN, ERROR, LOGOUT, UPDATE_USER } from "../types";

const loginUser = (user) => {
  if (!user) {
    errorInLogin();
  }
  return {
    type: LOGIN,
    payload: user,
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT
  };
};

const updateUserDetails = (user) => {
  return {
    type: UPDATE_USER,
    payload: user
  };
};

const errorInLogin = () => {
  return {
    type: ERROR,
    payload: "Error in from userActions (errorInLogin)",
  };
};

export default {
  loginUser, logoutUser, updateUserDetails
};
