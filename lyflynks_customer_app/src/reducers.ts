import { combineReducers } from "redux";
import { AuthReducer, MemberFormReducer, EmaiInvitationReducer, MemberAccountReducer } from "./modules/Auth";
import { activities } from './modules/Activity';
import menu from 'reducers/menu';

export default combineReducers({
  auth: AuthReducer,
  member_form: MemberFormReducer,
  email_invitations: EmaiInvitationReducer,
  members_accounts: MemberAccountReducer,
  activities,
  menu,
});
