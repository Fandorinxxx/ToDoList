import {combineReducers } from "redux";
import userReducer from "./user/userReducer"
import authReducer from "./user/auth/authReducer"
import taskReducer from "./task/taskReducer"



const rootReducer=combineReducers({
    user : userReducer,
    auth : authReducer,
    task : taskReducer,
});




export default rootReducer;
