import {
  MEMBER_UPDATE_USERNAME,
  MEMBER_UPDATE_PASSWORD,
  MEMBER_LOGIN,
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGIN_FAILURE,
  MEMBER_ACCOUNT_LOGIN,
  MEMBER_ACCOUNT_LOGIN_SUCCESS,
  MEMBER_ACCOUNT_LOGIN_FAILURE,
  MEMBER_ACCOUNT_LOGOUT,
} from '../actions/auth';

const initialState = {
  username: '',
  password: '',
  member: {},
  member_account: {},
  isFetching: false,
  error: {},
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_UPDATE_USERNAME:
      return {
        ...state,
        username: action.text,
      }

    case MEMBER_UPDATE_PASSWORD:
      return {
        ...state,
        password: action.text,
      }

    case MEMBER_LOGIN:
      return {
        ...state,
        isFetching: true,
      }

    case MEMBER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        member: action.data,
        error: {},
      }

    case MEMBER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        username: '',
        password: '',
      }

    case MEMBER_ACCOUNT_LOGIN:
      return {
        ...state,
        isFetching: true,
        member_account: {},
      }

    case MEMBER_ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        member_account: action.data,
        username: '',
        password: '',
      }
    case MEMBER_ACCOUNT_LOGOUT:
      debugger;
      return {
        ...state,
        isFetching: false,
        member_account: {},
        member: {},
        username: '',
        password: '',
      }

    case MEMBER_ACCOUNT_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    default:
      return state;
  }
}
