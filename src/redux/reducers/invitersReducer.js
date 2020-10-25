import {
    GET_INVITERS,
    ADD_INVITER,
    ERROR_INVITERS,
    SET_FILTER_LIST,
    CLEAR_FILTER_LIST, SET_CUR_INVITER, EDIT_INVITER, DELETE_INVITER
} from "../types";

const initialState = {
    invitersList: [],
    curInviter: null,
    invitersListFiltered: [],
    errorMessage: ""
};


const invitersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVITERS:
            return {
                ...state,
                invitersList: action.payload,
                invitersListFiltered: action.payload
            };
        case ADD_INVITER:
            return {
                ...state,
                invitersListFiltered: [...state.invitersListFiltered, action.payload],
                invitersList: [...state.invitersList, action.payload]
            };
        case EDIT_INVITER:
            return {
                ...state,
                invitersList: state.invitersList.map(inviter =>
                    inviter.id === action.payload.id ? action.payload : inviter
                )
            };
        case DELETE_INVITER:
            return {
                ...state,
                invitersList: state.invitersList.filter(inviter =>
                    inviter.id !== action.payload
                )
            };
        case SET_CUR_INVITER:
            return {
                ...state,
                curInviter: action.payload
            };
        case SET_FILTER_LIST:
            return {
                ...state,
                invitersListFiltered: [action.payload]
            };
        case CLEAR_FILTER_LIST:
            return {
                ...state,
                invitersListFiltered: state.invitersList
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