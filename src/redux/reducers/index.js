import {combineReducers} from 'redux';
import userReducer from './userReducer';
import invitersReducer from './invitersReducer';

export default combineReducers({
    userReducer: userReducer,
    invitersReducer: invitersReducer,
});
