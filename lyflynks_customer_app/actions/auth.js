import { auth } from "../api/LyfLynks_API";

export const MEMBER_UPDATE_USERNAME = "MEMBER_UPDATE_USERNAME";
export const MEMBER_UPDATE_PASSWORD = "MEMBER_UPDATE_PASSWORD";

export const MEMBER_LOGIN = "MEMBER_LOGIN";
export const MEMBER_LOGIN_SUCCESS = "MEMBER_LOGIN_SUCCESS";
export const MEMBER_LOGIN_FAILURE = "MEMBER_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGIN = "MEMBER_ACCOUNT_LOGIN";
export const MEMBER_ACCOUNT_LOGIN_SUCCESS = "MEMBER_ACCOUNT_LOGIN_SUCCESS";
export const MEMBER_ACCOUNT_LOGIN_FAILURE = "MEMBER_ACCOUNT_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGOUT = "MEMBER_ACCOUNT_LOGOUT";

export function updateLoginForm(text, field) {
  return dispatch => {
    if (field === "username") {
      dispatch(updateUsername(text));
    } else if (field === "password") {
      dispatch(updatePassword(text));
    }
  };
}

export function member(data) {
  return async dispatch => {
    dispatch(authMember());
    try {
      dispatch(authMemberSuccess(await auth.member(data)));
    } catch (err) {
      dispatch(authMemberFailure(err));
    }
  };
}

export function memberLogout(data) {
  return async dispatch => {
    dispatch(authMemberLogout());
    try {
      dispatch(await auth.member_logout(data));
    } catch (err) {
      debugger;
      dispatch(authMemberFailure(err));
    }
  };
}

export function member_account(data, token) {
  return async dispatch => {
    try {
      dispatch(
        authMemberAccountSuccess(await auth.member_account(data, token))
      );
    } catch (err) {
      dispatch(authMemberAccountFailure(err));
    }
  };
}

function updateUsername(text) {
  return { type: MEMBER_UPDATE_USERNAME, text };
}

function updatePassword(text) {
  return { type: MEMBER_UPDATE_PASSWORD, text };
}

function authMember() {
  return { type: MEMBER_LOGIN };
}

function authMemberSuccess(data) {
  debugger;
  return { type: MEMBER_LOGIN_SUCCESS, data };
}

function authMemberFailure(error) {
  return { type: MEMBER_LOGIN_FAILURE, error };
}

function authMemberAccount() {
  return { type: MEMBER_ACCOUNT_LOGIN };
}

function authMemberLogout() {
  return { type: MEMBER_ACCOUNT_LOGOUT };
}

function authMemberAccountSuccess(data) {
  return { type: MEMBER_ACCOUNT_LOGIN_SUCCESS, data };
}

function authMemberAccountFailure(error) {
  return { type: MEMBER_ACCOUNT_LOGIN_FAILURE, error };
}
