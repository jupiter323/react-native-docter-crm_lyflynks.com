import { auth } from "../api/LyfLynks_API";
import { sendPushNotificationToken, generatePushNotificationToken } from "../services/pushNotifications";

export const MEMBER_UPDATE_USERNAME = "MEMBER_UPDATE_USERNAME";
export const MEMBER_UPDATE_PASSWORD = "MEMBER_UPDATE_PASSWORD";

export const MEMBER_LOGIN = "MEMBER_LOGIN";
export const MEMBER_LOGIN_SUCCESS = "MEMBER_LOGIN_SUCCESS";
export const MEMBER_LOGIN_FAILURE = "MEMBER_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGIN = "MEMBER_ACCOUNT_LOGIN";
export const MEMBER_ACCOUNT_LOGIN_SUCCESS = "MEMBER_ACCOUNT_LOGIN_SUCCESS";
export const MEMBER_ACCOUNT_LOGIN_FAILURE = "MEMBER_ACCOUNT_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGOUT = "MEMBER_ACCOUNT_LOGOUT";

export const MEMBER_LOGOUT = "MEMBER_LOGOUT";
export const SET_USERNAME = "SET_USERNAME";

export function updateLoginForm(text, field) {
  return dispatch => {
    if (field === "username") {
      dispatch(updateUsername(text));
      dispatch(setUsername(text));
    } else if (field === "password") {
      dispatch(updatePassword(text));
    }
  };
}

export function member(data) {
  return async dispatch => {
    dispatch(authMember());
    try {
      const response = await auth.member(data);
      debugger;
      if (response.success == true) {
        const pushNotificationToken = generatePushNotificationToken();
        if (pushNotificationToken != null) {
          sendPushNotificationToken(response.data);
        }
      }
      dispatch(authMemberSuccess(response));
    } catch (err) {
      console.log(err);
    }
  };
}

export function memberLogout() {
  return async dispatch => {
    dispatch(memberAccountLogout());
    dispatch(authMemberLogout());
  };
}

export function member_account(data, token) {
  return async dispatch => {
    try {
      dispatch(authMemberAccountSuccess(await auth.member_account(data, token)));
    } catch (err) {
      console.log(err);
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

function setUsername(data) {
  return { type: SET_USERNAME, data };
}

function authMemberSuccess(data) {
  if (data.success != true) {
    return authMemberFailure(data);
  }
  return { type: MEMBER_LOGIN_SUCCESS, data };
}

function authMemberFailure(error) {
  return { type: MEMBER_LOGIN_FAILURE, error };
}

function authMemberAccount() {
  return { type: MEMBER_ACCOUNT_LOGIN };
}

function memberAccountLogout() {
  return { type: MEMBER_ACCOUNT_LOGOUT };
}

function authMemberLogout() {
  return { type: MEMBER_LOGOUT };
}

function authMemberAccountSuccess(data) {
  return { type: MEMBER_ACCOUNT_LOGIN_SUCCESS, data };
}

function authMemberAccountFailure(error) {
  return { type: MEMBER_ACCOUNT_LOGIN_FAILURE, error };
}
