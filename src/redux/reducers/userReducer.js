import {
    LOGIN,
    ERROR
} from "../types";

const initialState = {
    login: false,
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: true,
                user: action.payload
            };
        case ERROR:
            console.error("Error from UserReducer: " + action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
export default userReducer;