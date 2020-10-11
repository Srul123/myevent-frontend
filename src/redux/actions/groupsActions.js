import {GET_GROUPS, ERROR_GROUPS, BASE_URL} from "../types";
import axios from "axios";

const getGroupList = () => async dispatch => {
    try {
        const response = await axios.get(`${BASE_URL}/groups`);
        console.log(response);
        dispatch({
            type: GET_GROUPS,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: ERROR_GROUPS,
            payload: "Can't load group list",
        });
    }
};




const errorInGroupsActions = () => {
    return {
        type: ERROR_GROUPS,
        payload: "Error in Redux inviters actions)",
    };
};

export default {
    getGroupList,
    errorInGroupsActions,
};
