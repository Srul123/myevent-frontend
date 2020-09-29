import {
    LOGIN,
    ERROR,
    LOGOUT,
    UPDATE_USER
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
        case LOGOUT:
            return {
                ...state,
                login: false,
                user: {}
            };
        case UPDATE_USER:
            console.log(action.payload);
            console.log('action.payload');
            return {
                ...state,
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