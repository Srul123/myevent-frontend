import axios from 'axios';


import {
    CREATE_USER,
    ERROR
} from "../types";


const baseURL = "http://localhost:5000";

export const addUser = user => async dispatch => {
    console.log(`user: ${user}`);
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {

        const response = await axios.post(`${baseURL}/users`, user, config);
        const data = response.data;

        dispatch({
            type: CREATE_USER,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response
        });
    }
};

