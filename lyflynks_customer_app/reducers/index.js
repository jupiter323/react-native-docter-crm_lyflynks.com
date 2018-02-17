import { combineReducers } from 'redux';
import auth from './auth';
import members_accounts from './members_accounts';
import activities from './activities';

export default combineReducers({
  auth,
  members_accounts,
  activities,
});
