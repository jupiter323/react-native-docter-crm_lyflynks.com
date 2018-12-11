import { combineReducers } from "redux";
import { AuthReducer, MemberFormReducer, EmaiInvitationReducer, MemberAccountReducer } from "./modules/Auth";
import { activities } from './modules/Activity';
import { member_call_reducer as member_call } from './modules/CallOrder';
import { creditCard } from './modules/AccountSettings'
import transportReducer from './modules/Transport/reducer';
import menu from 'reducers/menu';
import loaders from 'reducers/loader';
import errors from 'reducers/error';

const appReducer = combineReducers({
  auth: AuthReducer,
  member_form: MemberFormReducer,
  email_invitations: EmaiInvitationReducer,
  members_accounts: MemberAccountReducer,
  transport: transportReducer,
  activities,
  menu,
  member_call,
  loaders,
  errors,
  creditCard
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;