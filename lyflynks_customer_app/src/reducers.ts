import { combineReducers } from "redux";
import { AuthReducer, MemberFormReducer, EmaiInvitationReducer } from "./modules/Auth";

export default combineReducers({
  auth: AuthReducer,
  member_form: MemberFormReducer,
  email_invitations: EmaiInvitationReducer
});
