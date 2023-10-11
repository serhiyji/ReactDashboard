import { RoleState, RoleActions, RoleActionTypes } from "./types";

const initialState: RoleState = {
  allRoles: []
};

const RoleReducer = (state = initialState, action: RoleActions): RoleState => {
  switch (action.type) {
    case RoleActionTypes.GETALLROLES_SUCCESS:
      return {...state, allRoles: action.payload.allRoles}
    default:
      return state;
  }
};

export default RoleReducer;