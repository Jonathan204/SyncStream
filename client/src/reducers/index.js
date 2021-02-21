import { combineReducers } from "redux";

import users from "./users";
import account from "./account";

export default combineReducers({ users, account }); //in here we can use all the invididual reducers that we have
