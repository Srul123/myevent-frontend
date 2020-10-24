import {
    GET_INVITERS,
    ADD_INVITER,
    ERROR_INVITERS,
    SET_FILTER_LIST,
    CLEAR_FILTER_LIST
} from "../types";

const initialState = {
        invitersList: [],
        invitersListFiltered: [],
        errorMessage: ""
    };


const invitersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVITERS:
            return {
                ...state,
                invitersList: action.payload,
                invitersListFiltered:action.payload
            };
        case ADD_INVITER:
            debugger;
            const test = action.payload;
            return {
                ...state,
                invitersListFiltered: [...state.invitersListFiltered, action.payload],
                invitersList: [...state.invitersList,action.payload]
            };
        case SET_FILTER_LIST:
            const filtered = Array.isArray(action.payload)? action.payload : [action.payload];
            return {
                ...state,
                invitersListFiltered: filtered
            };
        case CLEAR_FILTER_LIST:
            console.log("from CLEAR_FILTER_LIST")
            console.log(state);
            return {
                ...state,
                invitersListFiltered:state.invitersList
            };
        case ERROR_INVITERS:
            console.error("Error from invitersReducer: " + action.payload);
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};
export default invitersReducer;