import { combineReducers } from "redux";
import UserReducer from "./userReducer"; 
import RoleReducer from "./roleReducer";


export const rootReducer = combineReducers({
    UserReducer, 
    RoleReducer
})

export type  RootState = ReturnType<typeof rootReducer>;