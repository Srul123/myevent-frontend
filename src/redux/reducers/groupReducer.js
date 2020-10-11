import {
    GET_GROUPS,
    ERROR_GROUPS
} from "../types";

const initialState = {
    groupList: [],
    errorMessage: ""
};


const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groupList: action.payload,
            };
        case ERROR_GROUPS:
            console.error("Error from groupReducer: " + action.payload);
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};
export default groupReducer;