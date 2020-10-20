import {LOGIN, ERROR, LOGOUT, UPDATE_USER, BASE_URL} from "../types";
import axios from "axios";

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

const updateUserDetails = (user) => async dispatch => {
    console.log("user to update");
    console.log(user);
    let response;
    try {
        response = await axios.put(`${BASE_URL}/users/${user.id}`, user);
        dispatch({
            type: UPDATE_USER,
            payload: response.data
        });
    } catch (e) {
        console.log("Error from user action: updateUserDetails " + response);
        console.log(e);
        dispatch({
            type: ERROR,
            payload: "Can't update user details",
        });
    }
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
