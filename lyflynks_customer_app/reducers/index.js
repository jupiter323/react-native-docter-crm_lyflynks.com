import { combineReducers } from "redux";
import auth from "./auth";
import members_accounts from "./members_accounts";
import activities from "./activities";
import accountCreationForm from "./account_creation_form";
import emailInvitations from "./email_invitations";

export default combineReducers({
  auth,
  members_accounts,
  activities,
  accountCreationForm,
  emailInvitations
});
