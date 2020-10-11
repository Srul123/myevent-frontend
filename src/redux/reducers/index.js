import {combineReducers} from 'redux';
import userReducer from './userReducer';
import invitersReducer from './invitersReducer';
import groupReducer from './groupReducer';

export default combineReducers({
    userReducer,
    invitersReducer,
    groupReducer
});
