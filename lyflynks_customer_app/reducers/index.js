import { combineReducers } from 'redux';
import auth from './auth';
import members_accounts from './members_accounts';
import nav from './nav';

export default combineReducers({
  nav,
  auth,
  members_accounts,
});
