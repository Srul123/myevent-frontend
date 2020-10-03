import {ERROR_INVITERS, GET_INVITERS, BASE_URL, SET_FILTER_LIST, CLEAR_FILTER_LIST} from "../types";
import axios from "axios";

const getInvitersList = () => async dispatch => {
    try {
        const response = await axios.get(`${BASE_URL}/inviters`);
        console.log(response);
        dispatch({
            type: GET_INVITERS,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: ERROR_INVITERS,
            payload: "Can't load inviters list",
        });
    }
};

const setInvitersListFiltered = (filterList) => {
    console.log("call work")
    console.log(filterList)
    return {
        type: SET_FILTER_LIST,
        payload: filterList,
    };
};

const clearInvitersListFilter = () => {
    console.log("in clear")
    return {
        type: CLEAR_FILTER_LIST
    };
};


const errorInInvitersActions = () => {
    return {
        type: ERROR_INVITERS,
        payload: "Error in Redux inviters actions)",
    };
};

export default {
    getInvitersList,
    errorInInvitersActions,
    setInvitersListFiltered,
    clearInvitersListFilter
};
