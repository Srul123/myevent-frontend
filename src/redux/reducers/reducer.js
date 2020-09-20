import {
    CREATE_USER,
    ERROR
} from "../types";

const initialState = {
    count: 0,
    error: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                count: action.payload
            };
        case ERROR:
            console.error("Error from Reducer: " + action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;