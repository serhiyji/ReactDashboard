import { RoleActionTypes, RoleActions } from "../../reducers/roleReducer/types";
import { Dispatch } from "redux";
import { GetAllRoles } from "../../../services/api-role-service";

export const GetallRoles = () => {
    return async (dispatch: Dispatch<RoleActions>) => {
        const data = await GetAllRoles();
        const {response} = data;
        if (response.success) {
            dispatch({
                type: RoleActionTypes.GETALLROLES_SUCCESS, payload: { allRoles: response.payload }
            });
        }
    }
};