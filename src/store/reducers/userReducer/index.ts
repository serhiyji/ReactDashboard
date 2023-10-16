import { UserState, UserActions, UserActionTypes } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  loading: false,
  error: null,
  isAuth: false,
  idSelectedUser: null,
  selectedUser: {},
  allUsers: []
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.FINISHED_REQUEST:
      return { ...state, loading: false };
    case UserActionTypes.LOGIN_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.SERVER_ERROR:
      return { ...state, loading: false };
    case UserActionTypes.GETALLUSERS_REQUEST:
      return {...state, loading: false, message: action.payload.message, allUsers: action.payload.allUsers }
    case UserActionTypes.CREATEUSER_SUCCESS:
      return {...state, loading: false, message: action.payload.message}
    case UserActionTypes.EDITUSER_SUCCESS:
      return {...state, message: action.payload.message}
    case UserActionTypes.GETUSERBYID_SUCCESS:
      return {...state, selectedUser: action.payload.selectedUser}
    case UserActionTypes.SETIDSELECTEDUSER:
      return {...state, idSelectedUser: action.payload.idSelectedUser}
    case UserActionTypes.LOGOUT_USER:
      return {
        user: {},
        message: null,
        loading: false,
        error: null,
        isAuth: false,
        idSelectedUser: null,
        selectedUser: null,
        allUsers: []
      };
    default:
      return state;
  }
};

export default UserReducer;