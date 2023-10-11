import * as UserActionCreator from "./userActions";
import * as RoleActionCreator from "./roleActions"

export default {
    ...UserActionCreator,
    ...RoleActionCreator
}