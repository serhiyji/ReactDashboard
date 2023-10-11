import { type } from "os";

export interface RoleState{
    allRoles: []
}

export enum RoleActionTypes {
    GETALLROLES_SUCCESS = "GETALLROLES_SUCCESS"
}

interface GetAllRolesAction {
    type: RoleActionTypes.GETALLROLES_SUCCESS,
    payload: any
}

export type RoleActions = | GetAllRolesAction