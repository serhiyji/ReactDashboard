import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux"
import { toast } from "react-toastify"
import jwtDecode from "jwt-decode"

// Import services
import { login, setAccessToken, setRefreshToken, logout, removeTokens, GetAll, AddUser, DeleteUserById } from "../../../services/api-user-service";

export const LoginUser = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({ type: UserActionTypes.START_REQUEST });
            const data = await login(user);
            const { response } = data;
            if (!response.success) {
                dispatch({ type: UserActionTypes.LOGIN_USER_ERROR, payload: response.message })
                toast.error(response.message)
            }
            else {
                toast.success(response.message)
                const { accessToken, refreshToken, message } = response;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                AuthUser(accessToken, message, dispatch);
            }
        }
        catch (ex) {
            dispatch({ type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!" })
        }
    }
};

export const GetAllUsers = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        const data = await GetAll();
        const {response} = data;
        if (response.success) {
            dispatch({
                type: UserActionTypes.GETALLUSERS_REQUEST, payload: { allUsers: response.payload, message: response.message }
            });
        }
    }
};

export const LogOut = (id: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        const data = await logout(id);
        const { response } = data;
        if (response.success) {
            removeTokens();
            dispatch({
                type: UserActionTypes.LOGOUT_USER,
            });
        }
    };
};

export const AuthUser = (token: string, message: string, dispatch: Dispatch<UserActions>) => {
    const decodedToken = jwtDecode(token) as any;
    dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: { message, decodedToken } })
}

export const CreateUser = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            await AddUser(user);
            dispatch({
                type: UserActionTypes.CREATEUSER_SUCCESS, payload: {message: "User has been added"}
            });
        }
        catch (ex) {
            dispatch({
                type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!"
            });
        }
    }
}

export const DeleteById = (user: any) => {
    return async (dispatch: Dispatch<UserActions>) => {
        await DeleteUserById(user);
        const data = await GetAll();
        const {response} = data;
        if (response.success) {
            dispatch({
                type: UserActionTypes.GETALLUSERS_REQUEST, payload: { allUsers: response.payload, message: response.message }
            });
        }
    }
}