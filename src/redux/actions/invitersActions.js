import {
    ERROR_INVITERS,
    GET_INVITERS,
    ADD_INVITER,
    BASE_URL,
    SET_FILTER_LIST,
    CLEAR_FILTER_LIST, SET_CUR_INVITER, EDIT_INVITER, DELETE_INVITER
} from "../types";
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

const addInviter = (newInviter) => async dispatch => {
    try {
        const response = await axios.post(`${BASE_URL}/inviters`, newInviter);
        console.log(response);
        dispatch({
            type: ADD_INVITER,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: ERROR_INVITERS,
            payload: "Can't add new inviter",
        });
    }
};

const editInviter = (inviter) => async dispatch => {
    try {
        const response = await axios.put(`${BASE_URL}/inviters/${inviter.id}`, inviter);
        console.log(response);
        dispatch({
            type: EDIT_INVITER,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: ERROR_INVITERS,
            payload: "Can't edit new inviter",
        });
    }
};

const deleteInviter = (inviterID) => async dispatch => {
    // debugger;
    try {
        const response = await axios.delete(`${BASE_URL}/inviters/${inviterID}`);
        console.log("delete inviter with id: "+ inviterID);
        dispatch({
            type: DELETE_INVITER,
            payload: inviterID,
        });
    } catch (e) {
        dispatch({
            type: ERROR_INVITERS,
            payload: "Can't delete inviter with id: "+inviterID,
        });
    }
};

const setCurInviter = (inviter) => {
    return {
        type: SET_CUR_INVITER,
        payload: inviter,
    };
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
    addInviter,
    editInviter,
    deleteInviter,
    errorInInvitersActions,
    setInvitersListFiltered,
    clearInvitersListFilter,
    setCurInviter
};
