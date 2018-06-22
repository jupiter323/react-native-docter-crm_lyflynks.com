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
import {
  MEMBER_ACCOUNT_CREATION_SUCCESS,
  UPDATE_USER_CREDENTIALS
} from '../actions/accounts';

const initialState = {
  username: '',
  password: '',
  member: {},
  member_account: {},
  isFetching: false,
  error: {},
  newUser: false
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
        newUser: action.data.data.newUser,
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

    case MEMBER_ACCOUNT_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
      
    case MEMBER_ACCOUNT_LOGOUT:
      return {
        ...state,
        isFetching: false,
        member_account: {},
        member: {},
        username: '',
        password: '',
      }
    case UPDATE_USER_CREDENTIALS:
      return {
        ...state,
        password: action.memberDetails.password,
      }


    case MEMBER_ACCOUNT_CREATION_SUCCESS:
      return {
        ...state,
        member: action.data,
      }

    default:
      return state;
  }
}
