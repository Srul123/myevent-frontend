import { LOGIN, ERROR } from "../types";

const loginUser = (user) => {
  if (!user) {
    errorInLogin();
  }
  return {
    type: LOGIN,
    payload: user,
  };
};

const errorInLogin = () => {
  return {
    type: ERROR,
    payload: "Error in from userActions (errorInLogin)",
  };
};

export default {
  loginUser,
};
