import { combineReducers } from "redux";
import { AuthReducer, MemberFormReducer, EmaiInvitationReducer, MemberAccountReducer } from "./modules/Auth";
import { activities } from './modules/Activity';
import { member_call_reducer as member_call } from './modules/CallOrder';
import menu from 'reducers/menu';

export default combineReducers({
  auth: AuthReducer,
  member_form: MemberFormReducer,
  email_invitations: EmaiInvitationReducer,
  members_accounts: MemberAccountReducer,
  activities,
  menu,
  member_call
});
