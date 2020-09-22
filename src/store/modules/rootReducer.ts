import { combineReducers } from "redux";
import account from './account/reducer';
import searchbar from './searchbar/reducer';

export default combineReducers({
    account,
    searchbar
});