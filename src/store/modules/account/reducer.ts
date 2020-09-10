import { combineReducers } from "redux";
import tryLogin from './actions/tryLogin';

export default combineReducers({
    login: tryLogin
});