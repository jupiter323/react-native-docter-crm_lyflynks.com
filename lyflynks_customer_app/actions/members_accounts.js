import { members_accounts } from '../api/LyfLynks_API';

export const MEMBERS_ACCOUNTS_LIST = 'MEMBERS_ACCOUNTS_LIST';
export const MEMBERS_ACCOUNTS_LIST_SUCCESS = 'MEMBERS_ACCOUNTS_LIST_SUCCESS';
export const MEMBERS_ACCOUNTS_LIST_FAILURE = 'MEMBERS_ACCOUNTS_LIST_FAILURE';

export function list(token) {
  return async (dispatch) => {
    dispatch(membersAccountsList());
    try {
      dispatch(membersAccountsListSuccess(
        await members_accounts.list(token)
      ));
    } catch (err) {
      dispatch(membersAccountsListFailure(err));
    }
  }
}

export function memberInvite(email) {
  return async (dispatch) => {
    dispatch(memberInvite());
    try {
      dispatch(memberInvites(
        await members_accounts.memberInvite(email)
      ));
    } catch (err) {
      console.log(err)
    }
  }
}

function membersAccountsList() {
  return { type: MEMBERS_ACCOUNTS_LIST };
}

function membersAccountsListSuccess(data) {
  return { type: MEMBERS_ACCOUNTS_LIST_SUCCESS, data };
}

function membersAccountsListFailure(error) {
  return { type: MEMBERS_ACCOUNTS_LIST_FAILURE, error };
}
