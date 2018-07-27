import { combineReducers } from "redux";
import auth from "./auth";
import members_accounts from "./members_accounts";
import activities from "./activities";
import member_form from "./member_form";
import email_invitations from "./email_invitations";
import menu from './menu'
export default combineReducers({
  auth,
  members_accounts,
  activities,
  member_form,
  email_invitations,
  menu
});
