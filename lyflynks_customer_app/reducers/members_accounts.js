import {
  MEMBERS_ACCOUNTS_LIST,
  MEMBERS_ACCOUNTS_LIST_SUCCESS,
  MEMBERS_ACCOUNTS_LIST_FAILURE,
} from '../actions/members_accounts';

const initialState = {
  account_list: {},
  isFetching: false,
  error: {},
}

export default function membersAccountsReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERS_ACCOUNTS_LIST:
      return {
        ...state,
        isFetching: true,
      }

    case MEMBERS_ACCOUNTS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account_list: action.data,
      }

    case MEMBERS_ACCOUNTS_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state;
  }
}
